import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse {
  @ApiProperty()
  status: string;

  @ApiProperty()
  data: { any };
}
