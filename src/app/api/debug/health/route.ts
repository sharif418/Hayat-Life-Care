import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const debug: any = {};
  
  try {
    debug.envDatabaseUrl = process.env.DATABASE_URL || 'NOT_SET';
    
    // Check /app/data
    try {
      const dataDir = '/app/data';
      if (fs.existsSync(dataDir)) {
        debug.appDataFiles = fs.readdirSync(dataDir).map(file => {
          const stat = fs.statSync(path.join(dataDir, file));
          return `${file} (${stat.size} bytes)`;
        });
      } else {
        debug.appDataFiles = 'Directory /app/data does not exist';
      }
    } catch (e: any) {
      debug.appDataFilesError = e.message;
    }

    // Check /app/prisma
    try {
      const prismaDir = '/app/prisma';
      if (fs.existsSync(prismaDir)) {
        debug.appPrismaFiles = fs.readdirSync(prismaDir).map(file => {
          const stat = fs.statSync(path.join(prismaDir, file));
          return `${file} (${stat.size} bytes)`;
        });
      } else {
        debug.appPrismaFiles = 'Directory /app/prisma does not exist';
      }
    } catch (e: any) {
      debug.appPrismaFilesError = e.message;
    }
    
    // Check default Nextjs standalone dir
    try {
      debug.cwd = process.cwd();
      debug.cwdFiles = fs.readdirSync(process.cwd());
      
      const nodeModulesPrisma = path.join(process.cwd(), 'node_modules', 'prisma');
      debug.hasNodeModulesPrisma = fs.existsSync(nodeModulesPrisma);
      
      const prismaBin = path.join(nodeModulesPrisma, 'build', 'index.js');
      debug.hasPrismaBin = fs.existsSync(prismaBin);
    } catch (e: any) {
      debug.cwdError = e.message;
    }

    return NextResponse.json(debug);
  } catch (error: any) {
    return NextResponse.json({ error: error.message, debug }, { status: 500 });
  }
}
