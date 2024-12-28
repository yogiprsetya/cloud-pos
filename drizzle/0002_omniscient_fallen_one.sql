ALTER TABLE "product_variant_item" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant_label" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "product_variant_label" DROP COLUMN "updated_at";