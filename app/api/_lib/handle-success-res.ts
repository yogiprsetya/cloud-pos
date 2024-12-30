import { NextResponse } from 'next/server';
import { HttpMeta } from '~/model/types/http';

export const handleSuccessResponse = (data: unknown, meta?: HttpMeta) => {
  return NextResponse.json({ success: true, meta: meta || {}, data });
};
