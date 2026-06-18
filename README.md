![Cover](public/icons/Bible_Mockup.png)

# Bible Verse Web Extension — Frontend

A simple browser extension that delivers a random Bible verse daily in Bangla with an English translation, bringing peace and comfort to your day.



## What It Does

📖 Displays a Random Bible verse daily in your browser pop-up <br>
💾 Save and share your favorite verses <br>
⚡ Fast, lightweight, and distraction-free <br>

<!-- 🔍 Search verses by keyword <br> -->



## Tech Stack

| Tool               | Purpose                      |
| ------------------ | ---------------------------- |
| React + TypeScript | User Interface & type safety |
| Vite               | Fast builds                  |
| Tailwind CSS       | Styling                      |



### Install Dependencies

```bash
npm install
```

### Run in Dev Mode (Web Preview)

```bash
npm run dev
```

### Build for Production

```bash
# Standard web build
npm run build

# Chrome Extension build
npm run build: extension
```

---

## Getting Started

1. Run `npm run build: extension.`
2. Open `chrome://extensions/` in Chrome
3. Enable **Developer Mode** (top-right toggle)
4. Click **Load unpacked**
5. Select the `dist/` folder

That's it - the extension icon will appear in your toolbar.

---

## Roadmap

- [ ] Push notifications for daily reminders
- [ ] User accounts + cloud sync
- [ ] Search verses by keyword
- [ ] AI-powered verse recommendations
- [ ] AI bot that explains the verse
- [ ] Performance tuning (memoization, caching)
- [ ] Release mobile app version (Android and IOS)


<!-- ## Contributing -->

<!-- > **If  you want to contribute, here's how you can:**

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Build and test in Chrome using the **Load unpacked** flow above
4. Submit a pull request -->

## Credits

Thank you to all the people who have contributed!

<a href="https://github.com/Marg0n/bible_verse_web_extension/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Marg0n/bible_verse_web_extension" />
</a>

---

## Related to the Project
#### ⚙️ [Backend](https://github.com/Marg0n/bible_verse)
#### 📱 [Mobile App](https://github.com/Marg0n/)


## [License](https://github.com/Marg0n/bible_verse_web_extension?tab=notice-ov-file)

This project is [Apache Licensed](https://github.com/Marg0n/bible_verse_web_extension/blob/main/LICENSE).
