# YouTube Tagline Generator - Mastra Agent

This Mastra agent provides a powerful workflow for generating catchy taglines and names for YouTube videos. It analyzes video content and metadata to create compelling, attention-grabbing taglines that are optimized for engagement and SEO.

## Features

- **Video Analysis**: Extracts comprehensive video information from YouTube URLs
- **Creative Taglines**: Generates catchy, memorable taglines (3-8 words)
- **Short Names**: Creates punchy, brandable names (2-5 words)
- **SEO Optimization**: Produces search-engine optimized titles
- **Creative Rationale**: Provides explanations for tagline choices
- **Memory Integration**: Remembers past generations for consistency

## Components

### 1. YouTube Tool (`youtube-tool.ts`)
- Extracts video information from YouTube URLs
- Supports multiple YouTube URL formats
- Retrieves title, description, channel, duration, view count, and more
- Uses YouTube's oEmbed API for reliable data extraction

### 2. Tagline Agent (`tagline-agent.ts`)
- Specialized AI agent for creative tagline generation
- Uses Google's Gemini 2.5 Pro model for advanced reasoning
- Considers video content, audience, trends, and SEO factors
- Generates three types of outputs: taglines, names, and SEO titles

### 3. YouTube Tagline Workflow (`youtube-tagline-workflow.ts`)
- Orchestrates the entire process from URL to final taglines
- Two-step workflow: extract info → generate taglines
- Type-safe with comprehensive error handling
- Structured output with clear sections

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Create .env file
GOOGLE_API_KEY=your_google_api_key_here
```

3. Build the project:
```bash
npm run build
```

## Usage

### Method 1: Using the Workflow Directly

```javascript
import { mastra } from './src/mastra/index.js';

async function generateTaglines(youtubeUrl) {
  const workflow = mastra.getWorkflow('youtube-tagline-workflow');
  const { start } = workflow.createRun();

  const result = await start({
    triggerData: { youtubeUrl }
  });

  if (result.completed) {
    console.log('🎯 Catchy Tagline:', result.output.catchyTagline);
    console.log('🏷️ Short Name:', result.output.shortName);
    console.log('🔍 SEO Title:', result.output.seoTitle);
    console.log('💡 Rationale:', result.output.creativeRationale);
  }
}

// Example usage
generateTaglines('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
```

### Method 2: Using the Agent Directly

```javascript
import { mastra } from './src/mastra/index.js';

async function chatWithAgent() {
  const agent = mastra.getAgent('taglineAgent');

  const response = await agent.generate([
    {
      role: 'user',
      content: 'Generate a tagline for this video: https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  ]);

  console.log(response.text);
}
```

### Method 3: Running the Example

```bash
node example-usage.js
```

## Development

### Local Development Server

Start the Mastra development server to test your agents and workflows:

```bash
npm run dev
```

This will start the local development server at `http://localhost:4111/` where you can:
- Test agents in the playground
- Run workflows with different inputs
- View detailed traces and logs
- Debug tool calls and responses

### API Endpoints

Once running, you can access:

- **Workflow API**: `POST /api/workflows/youtube-tagline-workflow`
- **Agent API**: `POST /api/agents/taglineAgent/generate`
- **Playground**: `http://localhost:4111/`

## Workflow Structure

```
YouTube URL Input
       ↓
Extract Video Info (YouTube Tool)
       ↓
Generate Taglines (Tagline Agent)
       ↓
Structured Output:
├── 🎯 Catchy Tagline
├── 🏷️ Short Name
├── 🔍 SEO Title
└── 💡 Creative Rationale
```

## Output Format

The workflow returns a structured object with:

```typescript
{
  catchyTagline: string,      // 3-8 word attention-grabbing tagline
  shortName: string,          // 2-5 word punchy name
  seoTitle: string,           // SEO-optimized title
  creativeRationale: string,  // Explanation of choices
  videoInfo: {                // Original video metadata
    title: string,
    description: string,
    channel: string,
    duration: string,
    viewCount: string,
    publishDate: string,
    tags: string[],
    category: string,
    thumbnailUrl?: string
  }
}
```

## Supported YouTube URL Formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/watch?feature=...&v=VIDEO_ID`

## Customization

### Modifying Tagline Styles

Edit the agent instructions in `tagline-agent.ts` to change the style, tone, or format of generated taglines.

### Adding New Tools

Extend the workflow by adding new tools to the `tools/` directory and integrating them into the workflow steps.

### Changing Models

Update the model in `tagline-agent.ts` to use different AI providers or models:

```typescript
// Example: Switch to OpenAI
import { openai } from '@ai-sdk/openai';
model: openai('gpt-4o'),
```

## Error Handling

The workflow includes comprehensive error handling for:
- Invalid YouTube URLs
- Network failures
- API rate limits
- Malformed responses
- Missing video data

## Production Considerations

For production use, consider:

1. **YouTube Data API v3**: Replace the oEmbed approach with the official YouTube Data API for more comprehensive data
2. **Rate Limiting**: Implement proper rate limiting for YouTube API calls
3. **Caching**: Cache video information to avoid repeated API calls
4. **Validation**: Add more robust URL validation and error handling
5. **Monitoring**: Add logging and monitoring for workflow performance

## License

This project is licensed under the ISC License.