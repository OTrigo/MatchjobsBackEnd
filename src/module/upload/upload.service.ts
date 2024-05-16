import { Injectable } from '@nestjs/common';
import { fileDTO } from './upload.dto';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UploadService {
  async upload(file: fileDTO) {
    const supabasURL = process.env.SUPABASE_URL as string;
    const supabaseKey = process.env.SUPABASE_KEY as string;
    const supabase = createClient(supabasURL, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });
    const data = await supabase.storage
      .from('matchjobs')
      .upload(file.fieldname + '.pdf', file.buffer, {
        upsert: true, //sobrescreve arquivos com o mesmo nome
      });
    return data;
  }
}
