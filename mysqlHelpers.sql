//CHANGE FIELD TO UPPER CASE
UPDATE mi_Table SET mi_Table.field = UPPER(mi_Table.field);

//return a flag if exist ID in another table mysql
Table A
------------------
id | name |
 1 | beer |
 2 | wine |
------------------
table B
-----------------
id | id_table_a
1  | 1

return some thing like this:
-------------------------------
id | name | id_table_a | flag |
 1 | beer | 1          | 1    |
 2 | wine | Null       | 0    |
-------------------------------
select a.*, b.id_table_a, case when b.id is null then 0 else 1 end as flag 
from tablea a
left join tableb b on a.id = b.id_table_a
