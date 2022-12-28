import express, { Request, Response } from 'express';
import { spawn, exec } from 'child_process';
import rateLimit from 'express-rate-limit';

const app = express();
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

// const extractLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100, 
//   message: 'Too many requests from this IP, please try again later',
// });

// app.use("/extract", extractLimiter)

app.get("/extract", (req: Request, res: Response) => {
  const pakExtracter = spawn('./files/pak-extracter.exe', [
    '-assets',
    'D:\\SteamLibrary\\steamapps\\common\\New World\\assets',
    '-output',
    '.\\extract',
    '-filter',
    '.json',
    '-threads',
    '8',
  ]);
  let stdout: string = '';

  pakExtracter.stdout.on('data', (data: Buffer) => {
    stdout += data.toString();
  });
  
  let stderr = '';
  pakExtracter.stderr.on('data', (data: Buffer) => {
    stderr += data.toString();
  });
  
  pakExtracter.on('close', (code: number) => {
    console.log(`child process exited with code ${code}`);
    res.send({ stdout, stderr });
  });

  pakExtracter.on('error', (error: Error) => {
    console.error(`Error starting pak-extracter: ${error}`);
  });
})

app.get('/convert', (req: Request, res: Response) => {
  const inputDir: string = './extract/entities';
  const outputDir: string = './datasheets';
  const format: string = 'JSON';

  exec(`./datasheet-converter.exe -input ${inputDir} -output ${outputDir} -format ${format}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});

app.listen(port, () => {
  console.log(`ok!`)
})