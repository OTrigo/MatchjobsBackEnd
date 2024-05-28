import { Injectable } from '@nestjs/common';
import { fileDTO, nameDTO } from './upload.dto';
import { createClient } from '@supabase/supabase-js';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}
  async upload(file: fileDTO, namefile: string, userid: string) {
    const supabasURL = process.env.SUPABASE_URL as string;
    const supabaseKey = process.env.SUPABASE_KEY as string;
    const supabase = createClient(supabasURL, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });
    const data:any = await supabase.storage
      .from('matchjobs')
      .upload(namefile + '.pdf', file.buffer, {
        upsert: true, //sobrescreve arquivos com o mesmo nome
      })
      if (!data.data.path) {
        throw new Error('Erro ao obter a URL do vídeo');
      }
        const user = await this.prisma.user.update({
          data:{
            portifolio: data.data.path
          },
          where:{
            id: parseInt(userid)
          }
          
        })
        return user;
  }
}
