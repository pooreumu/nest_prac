// 🐱 Nestjs imports
import { PartialType } from '@nestjs/swagger';

// 🌏 Project imports
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
