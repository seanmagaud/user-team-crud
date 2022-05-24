# flynt-test

## Dependencies

```bash
# nodemon
reloading our server on save

# module-alias
create aliases to get clean module path

# pg
used to interfacing nodejs module with postgresql

# typeorm / class-validator / class-transformer
define and valide our entity, generate migrations, repository
```

## Further steps

Add message response, status for all crud

Restrict team creation with existing users id

Restrict role incrementation backend side

Finish findByRole logic

## Troubleshootings

Table joins

User role

Link users on Team with ManyToMany relation (try to add the whole object, then only the id; but I must add [ {id: X} ] , as we love, nothing is clearly explaned on the documentation)
