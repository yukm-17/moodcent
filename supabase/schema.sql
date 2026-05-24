-- ================================================
-- moodcent DB Schema (실제 Supabase 테이블 기준)
-- ================================================

-- ================================================
-- 초기 감성 태그 사전 데이터
-- search_dictionary 테이블이 이미 생성된 상태에서 실행
-- ================================================

insert into search_dictionary (keyword_ko, mapped_accords, mapped_moods, mapped_notes) values
  ('살냄새',     '["skin scent","soft musk"]'::jsonb,              '["intimate","warm"]'::jsonb,        '["musk","skin"]'::jsonb),
  ('비누향',     '["clean","aldehydic","musk"]'::jsonb,            '["fresh","clean"]'::jsonb,          '["aldehydes","soap"]'::jsonb),
  ('호텔향',     '["woody amber","luxury","warm spicy"]'::jsonb,   '["luxury","elegant"]'::jsonb,       '["amber","sandalwood"]'::jsonb),
  ('여름밤',     '["citrus","aquatic","light musk"]'::jsonb,       '["romantic","breezy"]'::jsonb,      '["bergamot","neroli"]'::jsonb),
  ('포근한',     '["amber","vanilla","warm"]'::jsonb,              '["cozy","warm"]'::jsonb,            '["vanilla","benzoin"]'::jsonb),
  ('도서관향',   '["woody","paper","earthy"]'::jsonb,              '["calm","intellectual"]'::jsonb,    '["vetiver","cedar"]'::jsonb),
  ('차가운도시', '["metallic","woody","cold spicy"]'::jsonb,       '["urban","cool"]'::jsonb,           '["black pepper","iris"]'::jsonb),
  ('달달한',     '["vanilla","gourmand","sweet"]'::jsonb,          '["playful","sweet"]'::jsonb,        '["vanilla","caramel","tonka bean"]'::jsonb),
  ('시원한',     '["aquatic","citrus","green"]'::jsonb,            '["fresh","energetic"]'::jsonb,      '["mint","cucumber","grapefruit"]'::jsonb),
  ('고급스러운', '["oud","rose","amber"]'::jsonb,                  '["luxury","rich"]'::jsonb,          '["oud","rose","saffron"]'::jsonb),
  ('봄날',       '["floral","green","fresh"]'::jsonb,              '["cheerful","light"]'::jsonb,       '["lily of the valley","peony"]'::jsonb),
  ('겨울향',     '["vanilla","warm spicy","woody"]'::jsonb,        '["cozy","warm"]'::jsonb,            '["cinnamon","clove","cedar"]'::jsonb),
  ('비오는날',   '["earthy","woody","green"]'::jsonb,              '["calm","melancholic"]'::jsonb,     '["petrichor","vetiver","moss"]'::jsonb),
  ('바다향',     '["aquatic","marine","citrus"]'::jsonb,           '["free","fresh"]'::jsonb,           '["sea salt","driftwood","citrus"]'::jsonb),
  ('숲속',       '["green","woody","earthy"]'::jsonb,              '["calm","natural"]'::jsonb,         '["pine","moss","fern"]'::jsonb)
on conflict (keyword_ko) do nothing;
