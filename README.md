# Zone01 Oujda Student Profile Dashboard

A modern, responsive web application for Zone01 Oujda students to track their learning progress, XP points, audit ratios, and skill development.

## 🚀 Features

- **Secure Authentication**: Login with your Zone01 credentials
- **Real-time Dashboard**: View your current XP, level, and audit ratio
- **Progress Tracking**: Monitor your advancement through modules and projects
- **Skills Overview**: See your skill levels and development areas
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Fast & Lightweight**: Pure static site with no dependencies

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with modern responsive design
- **API**: GraphQL queries to Zone01's internal API
- **Authentication**: JWT-based authentication
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── css/
│   ├── home.css        # Dashboard styling
│   └── login.css       # Login page styling
├── js/
│   ├── rootes.js       # Main application router
│   ├── auth/
│   │   ├── login.js    # Authentication logic
│   │   ├── logout.js   # Logout functionality
│   │   └── template.js # Login page template
│   └── graphql/
│       ├── fetch.js    # GraphQL API client
│       ├── querys.js   # GraphQL query definitions
│       └── userInfo.js # User data processing and UI
├── icons/              # Static icons and assets
└── .github/workflows/  # GitHub Actions for deployment
```

## 🚀 Getting Started

### Prerequisites

- A Zone01 Oujda student account
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yassinoli/graphql.git
   cd graphql
   ```

2. **Open in browser**
   - Open `index.html` in your web browser
   - Or serve locally using any static server

### Usage

1. **Login**: Enter your Zone01 username and password
2. **Dashboard**: View your profile information including:
   - Total XP earned
   - Current level
   - Audit ratio
   - Skill progression
   - Module completion status

## 🔧 Development

### Local Development

Since this is a static site, you can develop locally by:

1. Opening `index.html` directly in your browser
2. Using a local server like `live-server`
3. Making changes to HTML, CSS, or JS files

### API Integration

The app communicates with Zone01's GraphQL API:
- Authentication endpoint: `https://learn.zone01oujda.ma/api/auth/signin`
- GraphQL endpoint: `https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql`

## 🚀 Deployment

The project is automatically deployed to GitHub Pages using GitHub Actions:

- **Trigger**: Push to `main` branch or manual trigger
- **Build**: Static files are uploaded as artifacts
- **Deploy**: Content is served via GitHub Pages

## visite link bellow to acess :

[GRAPHQL](https://yassinoli.github.io/graphql)




## 🙏 Acknowledgments

- Zone01 Oujda for providing the learning platform and API
- The Zone01 community for inspiration and feedback