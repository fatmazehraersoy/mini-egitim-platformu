import fs from "node:fs"
import path from "node:path"
import multer from "multer"
import { randomUUID } from "node:crypto"

export const uploadsRoot = path.resolve(
  "uploads",
)

const lessonCoverDirectory = path.join(
  uploadsRoot,
  "lessons",
)

fs.mkdirSync(
  lessonCoverDirectory,
  {
    recursive: true,
  },
)

const storage = multer.diskStorage({
  destination: (
    _request,
    _file,
    callback,
  ) => {
    callback(
      null,
      lessonCoverDirectory,
    )
  },

  filename: (
    _request,
    file,
    callback,
  ) => {
    const extension =
      path.extname(
        file.originalname,
      ).toLowerCase()

    const uniqueName =
      `${Date.now()}-${randomUUID()}${extension}`

    callback(
      null,
      uniqueName,
    )
  },
})

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
]

export const lessonCoverUpload =
  multer({
    storage,

    limits: {
      fileSize:
        5 * 1024 * 1024,
    },

    fileFilter: (
      _request,
      file,
      callback,
    ) => {
      if (
        allowedMimeTypes.includes(
          file.mimetype,
        )
      ) {
        callback(null, true)
        return
      }

      callback(null, false)
    },
  })