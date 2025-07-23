import { mastra } from './src/mastra/index.js';

async function generateYouTubeTagline() {
  try {
    // Example YouTube URL
    const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    console.log('🎬 Generating taglines for YouTube video...');
    console.log(`URL: ${youtubeUrl}\n`);

    // Get the workflow
    const workflow = mastra.getWorkflow('youtube-tagline-workflow');

    // Create a run and start it
    const { start } = workflow.createRun();
    const result = await start({
      triggerData: {
        youtubeUrl: youtubeUrl
      }
    });

    if (result.completed) {
      console.log('✅ Workflow completed successfully!\n');
      console.log('📊 Results:');
      console.log('🎯 Catchy Tagline:', result.output.catchyTagline);
      console.log('🏷️ Short Name:', result.output.shortName);
      console.log('🔍 SEO Title:', result.output.seoTitle);
      console.log('💡 Creative Rationale:', result.output.creativeRationale);
      console.log('\n📹 Video Info:');
      console.log('Title:', result.output.videoInfo.title);
      console.log('Channel:', result.output.videoInfo.channel);
      console.log('Category:', result.output.videoInfo.category);
    } else {
      console.log('❌ Workflow did not complete');
      console.log('Status:', result.status);
    }

  } catch (error) {
    console.error('❌ Error running workflow:', error.message);
  }
}

// Run the example
generateYouTubeTagline();