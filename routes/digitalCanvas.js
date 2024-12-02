import express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello from Digitial Canvas");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const resp = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3-medium-diffusers",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
        }),
      }
    );
    const result = await resp.blob();
    const buffer = await result.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    // Generate the Data URL (Base64 encoding)
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;

    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;