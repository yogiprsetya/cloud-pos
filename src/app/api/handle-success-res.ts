import { NextResponse } from 'next/server';
import { HttpMeta } from '~/src/types/Response';

export const handleSuccessResponse = (data: unknown, meta?: HttpMeta) => {
  return NextResponse.json({ success: true, meta: meta || {}, data });
};
