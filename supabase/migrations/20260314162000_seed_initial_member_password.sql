update public.site_settings
set
  member_password_hash = '$2b$12$qJZUOKxV3J3EzqzkGmcDMem066ESZnq2EF4uGBoB8RI4KbrHqzVo2',
  member_password_updated_at = now(),
  updated_at = now()
where singleton = true;
