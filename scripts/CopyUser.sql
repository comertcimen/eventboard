create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, username, name, surname, created_at)
  values (new.id, new.email, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'surname', new.created_at);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();