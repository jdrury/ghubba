Note to self

public dir is for
- fonts
- images
- favicon

Q: what is the difference between the public dir and src/assets in the vite starter app?

Let me explain the key differences between the public directory and src/assets in a Vite application:
The public directory is for:

- Static assets that you want to serve at a fixed URL and don't need to be processed by Vite
- Files that need to be referenced by their exact name/path in your code  
- Assets that need to maintain their original filename  
- Files that exceed the size limit for bundling  
- Legacy scripts that need to be included as-is  

For example, if you put favicon.ico in the public directory, it will be available at /favicon.ico in your deployed app.
The src/assets directory is for:

- Files that you want to be processed, optimized, and bundled by Vite  
- Images, fonts, and other assets that you import directly in your JavaScript/TypeScript code  
- Assets whose filenames you want to be hashed for cache-busting  
- Smaller assets that benefit from being bundled  

For example, if you import an image from src/assets like:

```javascript
import logo from './assets/logo.png'
```

Vite will process it, potentially optimize it, and give it a unique hashed filename in the final build.
The main distinction is that public serves files as-is without processing, while src/assets files go through Vite's build pipeline.
