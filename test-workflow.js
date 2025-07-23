import { mastra } from './src/mastra/index.js';

async function testYouTubeWorkflow() {
  console.log('🧪 Testing YouTube Tagline Workflow...\n');

  // Test with a real YouTube video
  const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  try {
    // Test the YouTube tool directly
    console.log('1️⃣ Testing YouTube Tool...');
    const youtubeTool = mastra.getTool('get-youtube-info');
    const videoInfo = await youtubeTool.execute({
      context: { url: testUrl }
    });

    console.log('✅ Video Info Retrieved:');
    console.log(`   Title: ${videoInfo.title}`);
    console.log(`   Channel: ${videoInfo.channel}`);
    console.log(`   Category: ${videoInfo.category}\n`);

    // Test the tagline agent directly
    console.log('2️⃣ Testing Tagline Agent...');
    const taglineAgent = mastra.getAgent('taglineAgent');
    const response = await taglineAgent.generate([
      {
        role: 'user',
        content: `Generate a tagline for this video: ${videoInfo.title} by ${videoInfo.channel}`
      }
    ]);

    console.log('✅ Agent Response Generated');
    console.log('   Response length:', response.text.length, 'characters\n');

    // Test the full workflow
    console.log('3️⃣ Testing Full Workflow...');
    const workflow = mastra.getWorkflow('youtube-tagline-workflow');
    const { start } = workflow.createRun();

    const result = await start({
      triggerData: { youtubeUrl: testUrl }
    });

    if (result.completed) {
      console.log('✅ Workflow Completed Successfully!');
      console.log('\n📊 Final Results:');
      console.log(`🎯 Catchy Tagline: ${result.output.catchyTagline}`);
      console.log(`🏷️ Short Name: ${result.output.shortName}`);
      console.log(`🔍 SEO Title: ${result.output.seoTitle}`);
      console.log(`💡 Rationale: ${result.output.creativeRationale.substring(0, 100)}...`);
    } else {
      console.log('❌ Workflow failed to complete');
      console.log('Status:', result.status);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the test
testYouTubeWorkflow();