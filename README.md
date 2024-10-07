# Instagram Follower Analyzer 2024 🔍

A powerful JavaScript tool to analyze your Instagram followers and following relationships directly from your browser console.

## 🌟 Features

- Identify users who don't follow you back
- Find followers whom you don't follow
- Get detailed statistics about your Instagram connections
- Fast and efficient batch processing
- Built-in rate limiting to avoid API restrictions

## 📋 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- An active Instagram session in your browser

## 🚀 Usage

1. Visit Instagram.com and log in to your account
2. Open your browser's developer console:
   - Windows/Linux: Press `F12` or `Ctrl + Shift + J`
   - macOS: Press `Cmd + Option + J`
3. Copy and paste the entire script into the console
4. Run the analyzer using one of these commands:
   ```javascript
   analyzeFollowers()           // Analyzes the current profile page
   analyzeFollowers("username") // Analyzes the specified username
   ```

## 📊 Example Output

```
📊 Analysis Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Followers: 1000
   Following: 1200
   Not Following You Back: 300
   You're Not Following Back: 100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## ⚙️ Configuration

The script includes configurable options:
```javascript
const CONFIG = {
  API_KEY: "936619743392459",
  BATCH_SIZE: 50,
  DELAY: {
    MIN: 800,
    MAX: 1500
  }
};
```

- `BATCH_SIZE`: Number of users to fetch per request
- `DELAY`: Random delay between requests to avoid rate limiting

## ⚠️ Disclaimer

This tool is for educational purposes only. Please use responsibly and in accordance with Instagram's terms of service. Be aware that:
- Excessive use may lead to temporary API restrictions
- Instagram's API might change, potentially affecting the tool's functionality
- The script requires an active Instagram session in your browser

## 🔒 Privacy & Security

This script:
- Runs locally in your browser
- Doesn't store or transmit any data externally
- Uses your existing Instagram session for authentication

## 🤝 Contributing

Feel free to fork, improve, and submit pull requests. Suggestions and enhancements are welcome!

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

⭐ If you found this tool helpful, consider starring the repository!
