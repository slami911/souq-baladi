import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { uploadSingle, uploadMultiple, handleUpload, deleteFromCloudinary } from '../middleware/upload';

const router = Router();

router.post('/image', authenticate, uploadSingle('file'), handleUpload, async (req, res) => {
  try {
    const uploadedFile = (req as any).uploadedFile;

    if (!uploadedFile) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    res.json({
      url: uploadedFile.url,
      publicId: uploadedFile.publicId,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

router.post('/images', authenticate, uploadMultiple('files', 10), handleUpload, async (req, res) => {
  try {
    const uploadedFiles = (req as any).uploadedFiles;

    if (!uploadedFiles || uploadedFiles.length === 0) {
      res.status(400).json({ error: 'No files uploaded' });
      return;
    }

    res.json({
      files: uploadedFiles.map((f: any) => ({
        url: f.url,
        publicId: f.publicId,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

router.post('/video', authenticate, uploadSingle('file'), handleUpload, async (req, res) => {
  try {
    const uploadedFile = (req as any).uploadedFile;

    if (!uploadedFile) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    res.json({
      url: uploadedFile.url,
      publicId: uploadedFile.publicId,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload video' });
  }
});

router.delete('/:publicId', authenticate, async (req, res) => {
  try {
    const { publicId } = req.params;
    await deleteFromCloudinary(publicId);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

export default router;
