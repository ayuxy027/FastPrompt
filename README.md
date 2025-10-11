# FastPrompt

**The Missing Link Between Your Ideas and One-Shot Design Tools**

FastPrompt is a JSON-first, UI/UX Prompt Expansion Engine that transforms vague or minimal UI/UX prompts into fully structured, implementation-ready JSON payloads for modern UI generation tools like v0, Bolt, and Lovable.

## 🎯 The Problem

You have brilliant ideas for web applications, but when you try to use one-shot design tools like:
- **v0.dev** - Vercel's AI-powered UI generator
- **Bolt.new** - Lightning-fast app creation
- **Lovable** - AI-powered web app builder

You often end up with:
- ❌ Generic, uninspired designs
- ❌ Missing key UI components and interactions
- ❌ Inconsistent styling and branding
- ❌ Incomplete functionality specifications
- ❌ Poor responsive design considerations

## ✨ The Solution

FastPrompt acts as the **intelligent middleman** that:

1. **Expands Your Vague Prompts** into comprehensive, structured JSON specifications
2. **Enriches Your Ideas** with detailed UI/UX considerations
3. **Ensures Consistency** across typography, colors, spacing, and interactions
4. **Provides Implementation-Ready** specifications that one-shot tools can execute perfectly

## 🔧 How It Works

```
Your Simple Prompt → FastPrompt → Rich JSON Spec → One-Shot Tool → Perfect UI
```

### Input Example:
```
"Create a dashboard for a SaaS app"
```

### FastPrompt Output:
```json
{
  "audit": {
    "intent": "SaaS dashboard interface",
    "missingContext": ["target audience", "key metrics"],
    "assumptions": ["B2B users", "real-time data display"]
  },
  "layout": {
    "screens": ["dashboard", "analytics", "settings"],
    "responsive": {
      "desktop": "multi-column grid",
      "tablet": "stacked cards",
      "mobile": "single column"
    }
  },
  "uiDetails": {
    "typography": {
      "primaryFont": "Jakarta Sans",
      "secondaryFont": "Geist"
    },
    "colors": {
      "primary": "#2563eb",
      "semanticMood": "professional"
    }
  }
}
```

## 🎨 Features

### 📋 Comprehensive Auditing
- Analyzes your prompt for missing context
- Identifies assumptions and requirements
- Suggests improvements before generation

### 🏗️ Structured Layout Planning
- Multi-screen application structure
- Responsive design specifications
- Navigation patterns and behaviors

### 🎨 Detailed UI Specifications
- Typography with aesthetic fonts (Jakarta Sans, Geist)
- Color palettes with semantic mood control
- Component variants, states, and interactions
- Spacing systems and visual hierarchy

### ⚡ Micro-Interactions & Animations
- Hover states and transitions
- Loading animations
- Form validations and feedback
- Modal behaviors and backdrops

### 🔧 Technical Implementation
- API endpoint specifications
- Data flow logic
- Authentication patterns
- Dynamic behavior definitions

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FastPrompt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the prompt expansion interface**
   - Open your browser to the local development URL
   - Enter your UI/UX prompt
   - Get your structured JSON output
   - Copy and paste into your favorite one-shot design tool

## 🛠️ Tech Stack

- **React 19** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first styling
- **ESLint** - Code quality assurance

## 📊 Why Use FastPrompt?

### Before FastPrompt:
```
Prompt: "Make a blog"
Result: Generic blog with basic styling
```

### After FastPrompt:
```
Prompt: "Make a blog"
FastPrompt Output: Comprehensive JSON with:
- Typography system (Jakarta Sans + Geist)
- Color palette with semantic mood
- Component specifications
- Responsive breakpoints
- Micro-interactions
- Content management flow
Result: Professional, branded blog with perfect UX
```

## 🎯 Perfect Integration With:

- **v0.dev** - Paste JSON directly into v0 prompts
- **Bolt.new** - Use structured specs for better Bolt results
- **Lovable** - Feed detailed specifications for superior outputs
- **Any AI Design Tool** - Universal JSON format works everywhere

## 📝 Example Use Cases

- **SaaS Dashboards** - Transform "dashboard" into detailed analytics interface specs
- **E-commerce Sites** - Convert "online store" into complete shopping experience
- **Portfolio Websites** - Evolve "portfolio" into professional showcase
- **Mobile Apps** - Expand "mobile app" into comprehensive native experience
- **Admin Panels** - Develop "admin interface" into full management system

## 🤝 Contributing

We welcome contributions! Whether it's:
- New prompt templates
- Enhanced JSON schema
- UI improvements
- Documentation updates

## 📄 License

MIT License - feel free to use this tool to supercharge your design workflow!

---

**Ready to bridge the gap between your ideas and perfect UI? Start using FastPrompt today!** 🚀