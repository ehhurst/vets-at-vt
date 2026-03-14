alter table public.officers
add column if not exists name text;

update public.officers
set name = officer_role
where name is null or btrim(name) = '';

alter table public.officers
alter column name set default '';

alter table public.officers
alter column name set not null;

insert into public.officers (
  name,
  headshot_href,
  officer_role,
  role_type,
  email,
  officer_description,
  branch,
  display_order
)
values
  (
    'Michael Alvarez',
    '/headshot_test.png',
    'President',
    'executive',
    'malvarez@vt.edu',
    'Michael is a U.S. Army veteran studying business information technology. He enjoys helping members get connected quickly and keeping the organization focused on practical support, strong events, and community.',
    'U.S. Army',
    1
  ),
  (
    'Rachel Kim',
    '/headshot_test.png',
    'Vice President',
    'executive',
    'rkim@vt.edu',
    'Rachel is a U.S. Navy veteran studying systems engineering. She helps coordinate chapter operations, supports event planning, and works to make sure members can easily get involved throughout the semester.',
    'U.S. Navy',
    2
  ),
  (
    'Danielle Brooks',
    '/headshot_test.png',
    'Secretary',
    'executive',
    'dbrooks@vt.edu',
    'Danielle is a Marine Corps veteran majoring in human development. She manages meeting notes, chapter communications, and internal organization so members stay informed and leadership stays on track.',
    'U.S. Marine Corps',
    3
  ),
  (
    'Marcus Reed',
    '/headshot_test.png',
    'Treasurer',
    'executive',
    'mreed@vt.edu',
    'Marcus is a U.S. Air Force veteran studying accounting. He oversees budgeting, reimbursement planning, and chapter funding so the organization can run events responsibly and sustainably.',
    'U.S. Air Force',
    4
  ),
  (
    'Tyler Nguyen',
    '/headshot_test.png',
    'Social Chair',
    'chair',
    'tnguyen@vt.edu',
    'Tyler is an Army National Guard member in industrial design. He plans social gatherings that help veterans, service members, and dependents build friendships and feel part of the community at Virginia Tech.',
    'Army National Guard',
    5
  ),
  (
    'Samantha Lewis',
    '/headshot_test.png',
    'Philanthropy Chair',
    'chair',
    'slewis@vt.edu',
    'Samantha is a military-connected student studying public health. She organizes service projects and charitable initiatives that connect the chapter with the wider Blacksburg and Virginia Tech communities.',
    null,
    6
  ),
  (
    'Jordan Patel',
    '/headshot_test.png',
    'Social Media Chair',
    'chair',
    'jpatel@vt.edu',
    'Jordan is a U.S. Coast Guard veteran majoring in computer science. He manages digital outreach, promotes upcoming events, and helps keep the chapter visible and easy to follow online.',
    'U.S. Coast Guard',
    7
  )
on conflict (officer_role) do update
set
  name = excluded.name,
  headshot_href = excluded.headshot_href,
  role_type = excluded.role_type,
  email = excluded.email,
  officer_description = excluded.officer_description,
  branch = excluded.branch,
  display_order = excluded.display_order,
  last_updated_at = now();
