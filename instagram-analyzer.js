// Instagram Follower Analyzer 2024
// Run this code in your browser console while on Instagram.com

(() => {
  // Verify Instagram site
  if (window.location.origin !== "https://www.instagram.com") {
    console.clear();
    console.log("%c⚠️ This script must be run on Instagram!", "color: #ff0000; font-size: 20px; font-weight: bold;");
    window.alert("Redirecting to Instagram... Please run the script again once there.");
    window.location.href = "https://www.instagram.com";
    return;
  }

  // Configuration
  const CONFIG = {
    API_KEY: "936619743392459",
    BATCH_SIZE: 50,
    DELAY: {
      MIN: 800,
      MAX: 1500
    }
  };

  // Styling
  const STYLES = {
    title: "color: #E1306C; font-size: 20px; font-weight: bold;",
    section: "color: #833AB4; font-size: 16px; font-weight: bold;",
    info: "color: #3897f0;",
    success: "color: #00ff00;",
    error: "color: #ff0000;",
    warning: "color: #fcaf45;"
  };

  // API utilities
  const api = {
    fetchOptions: {
      credentials: "include",
      headers: {
        "X-IG-App-ID": CONFIG.API_KEY
      },
      method: "GET"
    },

    sleep: (ms) => new Promise(r => setTimeout(r, ms)),
    
    random: (min, max) => Math.floor(Math.random() * (max - min)) + min
  };

  class InstagramAnalyzer {
    async getFriendshipData(list, userId, count, nextMaxId = "") {
      const url = `https://www.instagram.com/api/v1/friendships/${userId}/${list}/?count=${count}${nextMaxId ? `&max_id=${nextMaxId}` : ""}`;
      const data = await fetch(url, api.fetchOptions).then(r => r.json());

      if (data.next_max_id) {
        const delay = api.random(CONFIG.DELAY.MIN, CONFIG.DELAY.MAX);
        console.log(`%c📥 Loaded ${data.users.length} ${list}. Waiting ${delay}ms...`, STYLES.info);
        await api.sleep(delay);
        
        return data.users.concat(
          await this.getFriendshipData(list, userId, count, data.next_max_id)
        );
      }

      return data.users;
    }

    async getUserId(username) {
      const url = `https://www.instagram.com/api/v1/web/search/topsearch/?context=blended&query=${username.toLowerCase()}&include_reel=false`;
      const data = await fetch(url, api.fetchOptions).then(r => r.json());
      
      return data.users?.find(
        result => result.user.username.toLowerCase() === username.toLowerCase()
      )?.user?.pk || null;
    }

    async analyze(username) {
      console.clear();
      console.log(`%c
╔═══════════════════════════════════════════════╗
║     📸 Instagram Follower Analyzer 2024       ║
║          Discover Your Unfollowers            ║
╚═══════════════════════════════════════════════╝`, STYLES.title);

      try {
        console.log(`%c🔍 Analyzing profile: ${username}`, STYLES.section);
        
        const userId = await this.getUserId(username);
        if (!userId) throw new Error(`User "${username}" not found`);

        const [followers, following] = await Promise.all([
          this.getFriendshipData("followers", userId, CONFIG.BATCH_SIZE),
          this.getFriendshipData("following", userId, CONFIG.BATCH_SIZE)
        ]);

        const followerSet = new Set(followers.map(f => f.username.toLowerCase()));
        const followingSet = new Set(following.map(f => f.username.toLowerCase()));

        const notFollowingBack = Array.from(followingSet)
          .filter(following => !followerSet.has(following));
        
        const notFollowedBack = Array.from(followerSet)
          .filter(follower => !followingSet.has(follower));

        // Print Results
        console.log(`%c
📊 Analysis Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Followers: ${followerSet.size}
   Following: ${followingSet.size}
   Not Following You Back: ${notFollowingBack.length}
   You're Not Following Back: ${notFollowedBack.length}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, STYLES.info);

        if (notFollowingBack.length > 0) {
          console.log(`%c👤 Users Not Following You Back:`, STYLES.section);
          notFollowingBack.forEach((user, i) => {
            console.log(`${i + 1}. ${user}`);
          });
        }

        if (notFollowedBack.length > 0) {
          console.log(`%c👥 Users You Don't Follow Back:`, STYLES.section);
          notFollowedBack.forEach((user, i) => {
            console.log(`${i + 1}. ${user}`);
          });
        }

        console.log(`%c✅ Analysis completed successfully!`, STYLES.success);
        
      } catch (error) {
        console.log(`%c❌ Error: ${error.message}`, STYLES.error);
      }
    }
  }

  // Make the analyzer available globally
  window.analyzeFollowers = (username = null) => {
    if (!username) {
      // Try to get username from the current page
      const metaElement = document.querySelector('meta[property="og:title"]');
      username = metaElement ? metaElement.content.split(' ')[0] : null;
    }
    
    if (!username) {
      console.log(`%c❌ Please provide a username or visit an Instagram profile page.`, STYLES.error);
      return;
    }
    
    const analyzer = new InstagramAnalyzer();
    analyzer.analyze(username);
  };

  // Print instructions
  console.log(`%c
To analyze followers, type:
  analyzeFollowers()     - analyzes the current profile page
  analyzeFollowers("username") - analyzes the specified username

Example:
  analyzeFollowers("instagram")`, STYLES.info);

})();
