import { Injectable } from '@nestjs/common';
import { descriptionpostDTO, nameVideoDTO, namepostDTO, supaResultDTO, userIdpostDTO, videoDTO } from './upload-video.dto';
import { createClient } from '@supabase/supabase-js';
import { postDto } from 'src/post/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UploadVideoService {
  constructor(private prisma: PrismaService) {}
  async upload(
    file: videoDTO,
    nameFile: nameVideoDTO,
    name: namepostDTO,
    description: descriptionpostDTO,
    userId: userIdpostDTO,
  ) {
    const supabaseURL = process.env.SUPABASE_URL as string;
    const supabaseKey = process.env.SUPABASE_KEY as string;
    const supabase = createClient(supabaseURL, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });

    try {
      // Upload do vídeo para o Supabase
      const result = await supabase.storage
        .from('matchjobsVideos')
        .upload(nameFile.nameFile + '.mp4', file.buffer, {
          upsert: true,
        });

      if (result.error) {
        throw result.error;
      }

      const videoUrl = result.data?.path;

      if (!videoUrl) {
        throw new Error('Erro ao obter a URL do vídeo');
      }

      // Criação do post no banco de dados
      const post = await this.prisma.posts.create({
        data: {
          name: name.name,
          description: description.description,
          userId: parseInt(userId.userId),
          url: videoUrl,
        },
      });

      return post;
    } catch (e) {
      console.log(e);
      throw new Error('Erro ao fazer upload do vídeo e criar post');
    }
  }
  async request() {
    const supabasURL = process.env.SUPABASE_URL as string;
    const supabaseKey = process.env.SUPABASE_KEY as string;
    const supabase = createClient(supabasURL, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });
    const { data, error } = await supabase.storage
      .from('matchjobsVideos')
      .list();
    if (error) {
      throw new Error(`Error listing items in bucket: ${error.message}`);
    }
    console.log(data);
    return data;
  }
}
