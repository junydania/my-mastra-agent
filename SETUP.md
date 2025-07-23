# Setup Guide - YouTube Tagline Generator

## Prerequisites

1. **Node.js** (v20.9.0 or higher)
2. **Google AI API Key** for Gemini model access

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the project root:

```bash
# Google AI API Key for Gemini model
# Get your API key from: https://makersuite.google.com/app/apikey
GOOGLE_API_KEY=your_google_api_key_here

# Optional: OpenAI API Key (if you want to switch models)
# OPENAI_API_KEY=your_openai_api_key_here

# Optional: Database URL for persistent storage
# DATABASE_URL=file:../mastra.db
```

### 3. Get Google AI API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key to your `.env` file

### 4. Build the Project

```bash
npm run build
```

## Testing Your Setup

### Option 1: Run the Test Script

```bash
node test-workflow.js
```

### Option 2: Start Development Server

```bash
npm run dev
```

Then visit `http://localhost:4111/` to use the Mastra playground.

### Option 3: Run the Example

```bash
node example-usage.js
```

## Troubleshooting

### Common Issues

1. **"Google API Key not found"**
   - Make sure your `.env` file exists and contains `GOOGLE_API_KEY=your_key_here`
   - Verify the API key is valid and has access to Gemini models

2. **"YouTube tool not found"**
   - Run `npm run build` to compile the TypeScript files
   - Check that all files are properly imported in `src/mastra/index.ts`

3. **"Workflow failed to complete"**
   - Check the console for detailed error messages
   - Verify the YouTube URL is valid and accessible
   - Ensure your internet connection is working

4. **"Memory storage error"**
   - The default uses in-memory storage (`:memory:`)
   - For persistence, change to `file:../mastra.db` in the Mastra config

### Getting Help

- Check the [Mastra documentation](https://mastra.ai/docs)
- Review the [README.md](./README.md) for detailed usage instructions
- Run `npm run dev` and use the playground for interactive debugging

## Next Steps

Once setup is complete:

1. **Customize the agent** by editing `src/mastra/agents/tagline-agent.ts`
2. **Add new tools** in the `src/mastra/tools/` directory
3. **Extend the workflow** in `src/mastra/workflows/youtube-tagline-workflow.ts`
4. **Deploy to production** using Mastra Cloud or your preferred hosting platform