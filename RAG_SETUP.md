# RAG Setup for NEET Study Assistant

## Prerequisites

1. Create a free Supabase account at https://supabase.com
2. Create a new project
3. Enable the pgvector extension

## Supabase Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- Enable vector extension
create extension if not exists vector;

-- Create NCERT content table
create table ncert_content (
  id bigserial primary key,
  subject text not null,
  class_level text not null,
  chapter_number int not null,
  chapter_name text not null,
  subtopic text,
  content text not null,
  embedding vector(1536),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create index for fast similarity search
create index on ncert_content using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Create search function
create or replace function match_ncert_content(
  query_embedding vector(1536),
  subject_filter text default null,
  class_filter text default null,
  match_threshold float default 0.7,
  match_count int default 5
)
returns table (
  id bigint,
  subject text,
  class_level text,
  chapter_number int,
  chapter_name text,
  subtopic text,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    ncert_content.id,
    ncert_content.subject,
    ncert_content.class_level,
    ncert_content.chapter_number,
    ncert_content.chapter_name,
    ncert_content.subtopic,
    ncert_content.content,
    1 - (ncert_content.embedding <=> query_embedding) as similarity
  from ncert_content
  where 
    (subject_filter is null or ncert_content.subject = subject_filter)
    and (class_filter is null or ncert_content.class_level = class_filter)
    and 1 - (ncert_content.embedding <=> query_embedding) > match_threshold
  order by ncert_content.embedding <=> query_embedding
  limit match_count;
end;
$$;
```

## Environment Variables

Add to your Cloudflare Pages:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon/public key

## Next Steps

After setting up Supabase:
1. Run the content ingestion script
2. Test the similarity search
3. Integrate with the API
