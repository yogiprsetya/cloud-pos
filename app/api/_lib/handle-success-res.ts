import { NextResponse } from 'next/server';
import { HttpMeta } from '~/domain/types/Http';

export const handleSuccessResponse = (data: unknown, meta?: HttpMeta) => {
  return NextResponse.json({ success: true, meta: meta || {}, data });
};
