
const fs = require('fs');
const path = require('path');

const projectsDir = 'C:\\Users\\Lenovo\\Projects';
const outputFilePath = 'c:\\Users\\Lenovo\\Projects\\portofolio-rusydi\\data\\projectsData.ts';

const projectDirs = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'node_modules' && dirent.name !== '.git')
    .map(dirent => dirent.name);

const projectsData = projectDirs.map(dirName => {
    const projectPath = path.join(projectsDir, dirName);
    const packageJsonPath = path.join(projectPath, 'package.json');
    let packageJson = {};
    
    if (fs.existsSync(packageJsonPath)) {
        try {
            packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        } catch (e) {}
    }

    // Look for images
    const possibleImageDirs = ['', 'public', 'assets', 'src/assets', 'public/images', 'public/img', 'public/assets'];
    let thumbnail = '';
    let sourceImagePath = '';
    
    for (const imgDir of possibleImageDirs) {
        const fullImgDirPath = path.join(projectPath, imgDir);
        if (fs.existsSync(fullImgDirPath)) {
            const files = fs.readdirSync(fullImgDirPath);
            // Prioritize names that look like screenshots or previews
            const imageFile = files.find(f => /\.(png|jpe?g|webp)$/i.test(f) && 
                (f.toLowerCase().includes('screenshot') || 
                 f.toLowerCase().includes('thumb') || 
                 f.toLowerCase().includes('preview') || 
                 f.toLowerCase().includes('cover') ||
                 f.toLowerCase().includes('hero') ||
                 f.toLowerCase().includes('main'))) ||
                files.find(f => /\.(png|jpe?g|webp)$/i.test(f) && !f.includes('logo') && !f.includes('icon') && !f.includes('file.svg'));
            
            if (imageFile) {
                thumbnail = imageFile;
                sourceImagePath = path.join(fullImgDirPath, imageFile);
                break;
            }
        }
    }

    // Copy image to public/projects/[dirName]/[thumbnail]
    if (thumbnail && sourceImagePath) {
        const targetDir = path.join('c:\\Users\\Lenovo\\Projects\\portofolio-rusydi\\public\\projects', dirName);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        const targetPath = path.join(targetDir, thumbnail);
        try {
            fs.copyFileSync(sourceImagePath, targetPath);
        } catch (e) {
            console.error(`Failed to copy image for ${dirName}:`, e.message);
        }
    }

    const name = packageJson.name || dirName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const description = packageJson.description || 'A project developed by Rusydi.';
    const tech = packageJson.dependencies ? Object.keys(packageJson.dependencies).slice(0, 5) : [];

    return {
        id: dirName,
        title: name,
        description: description,
        image: thumbnail ? `/projects/${dirName}/${thumbnail}` : '/placeholder.png',
        tags: tech,
        link: '#',
        folderName: dirName
    };
});

const fileContent = `
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  folderName: string;
}

export const projectsData: Project[] = ${JSON.stringify(projectsData, null, 2)};
`;

fs.writeFileSync(outputFilePath, fileContent);
console.log('Projects data generated at:', outputFilePath);
