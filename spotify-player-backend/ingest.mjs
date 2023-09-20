import yaml from 'yaml';
import fs from 'fs';


export async function ingest() {
    try {
        const yamlData = fs.readFileSync('fixed-spotify-open-api.yml', 'utf8');
        let data = yaml.parse(yamlData)
        
        let element = '';
        for (const key in data.paths) {
          if (data.paths.hasOwnProperty(key)) {
            const name = key
            const pathInfo = data.paths[key];
            let method = '';
            let description = '';
      
            if (pathInfo.get) {
              method = 'get'
              description = pathInfo.get.description
            } else if (pathInfo.put) {
              method = 'put'
              description = pathInfo.put.description
            } else if (pathInfo.post) {
              method = 'post'
              description = pathInfo.post.description
            } else if (pathInfo.delete) {
              method = 'delete'
              description = pathInfo.delete.description
            } 
            element += method + ", " + name + ", " + description
          }
        }
        fs.writeFileSync('output.txt', element)
      } catch (error) {
        console.error('Error reading or parsing the YAML file:', error);
      }
}

