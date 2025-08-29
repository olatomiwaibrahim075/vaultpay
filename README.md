# VaultPay - Cryptocurrency Wallet Application

A modern React-based cryptocurrency wallet application built with the latest frontend technologies for managing digital assets securely and efficiently.

## 🚀 Features

- **Dashboard**: Portfolio overview with market data and quick actions
- **Send Crypto**: Secure cryptocurrency transfers with transaction preview
- **Receive Crypto**: QR code generation and address sharing
- **Transaction History**: Complete transaction tracking and filtering
- **Settings**: User preferences and security configurations
- **Login System**: Secure authentication interface

## 🛠️ Tech Stack

- **React 18** - Latest React version with improved rendering
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - Simplified state management
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing
- **D3.js & Recharts** - Advanced data visualization
- **Framer Motion** - Smooth UI animations
- **React Hook Form** - Efficient form handling

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/vaultpay.git
   cd vaultpay
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to [http://localhost:4028](http://localhost:4028)

## 📁 Project Structure

```
vaultpay/
├── public/                 # Static assets
│   ├── assets/images/     # Application images
│   ├── favicon.ico        # Browser favicon
│   ├── manifest.json      # PWA manifest
│   └── robots.txt         # Search engine instructions
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Basic UI components (Button, Input, etc.)
│   │   └── ...           # Other utility components
│   ├── pages/            # Page components
│   │   ├── dashboard/    # Main dashboard with portfolio
│   │   ├── send/         # Send cryptocurrency
│   │   ├── receive/      # Receive cryptocurrency
│   │   ├── transactions/ # Transaction history
│   │   ├── settings/     # User settings
│   │   └── login/        # Authentication
│   ├── styles/           # Global styles and CSS
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main application component
│   ├── Routes.jsx        # Application routing
│   └── index.jsx         # Application entry point
├── .env                  # Environment variables
├── index.html            # HTML template
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.mjs       # Vite configuration
```

## 🎨 Styling & Design

- **TailwindCSS** with custom color palette
- **Responsive design** for mobile and desktop
- **Dark mode** support
- **Fluid typography** for responsive text scaling
- **Smooth animations** with Framer Motion
- **Glass morphism** effects with backdrop blur

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1400px+)

## 🚀 Deployment

### Build for production
```bash
npm run build
# or
yarn build
```

### Preview production build
```bash
npm run serve
# or
yarn serve
```

### Deploy to platforms
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the build folder
- **GitHub Pages**: Use GitHub Actions for deployment

## 🔧 Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```env
VITE_APP_TITLE=VaultPay
VITE_API_BASE_URL=your_api_url_here
# Add other environment variables as needed
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- Powered by React and Vite
- Styled with Tailwind CSS
- Icons by Lucide React

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using modern web technologies
