import path from 'path';
import { fileURLToPath } from 'url';

// Fix for ES modules (no __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadSynopsis(_, res) {
  try {
    // Corrected path to the file
    const file = path.join(__dirname, '../../../public/carePlus_synopsis.pdf');
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=carePlus_synopsis.pdf');
    
    return res.download(file, (err) => {
      if (err) {
        console.error("Error during file download:", err);
        res.status(500).send("Error downloading the file");
      }
    });
  } catch (error) {
    console.error("Error while handling the request:", error);
    return res.status(500).send("An error occurred while processing your request.");
  }
}

export { downloadSynopsis };
