+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+

1. ## What columns violate 1NF?
The columns that violate 1NF are:
   - member_id, it should be unique (a primary key)
   - food_description (contain multible values)
   - food_code (contain multible values)

2. ## What entities do you recognize that could be extracted?
   - Members
   - Dinner
   - Venue
   - Food

3. ## Name all the tables and columns that would make a 3NF compliant solution.
   - Memebrs (member_id (PK) | member_name | member_address)
   - Dinner (dinner_id (PK) | dinner_date)
   - Food (food_code (PK) | food_description) 
   - Venue (venue_code (PK) | venue_description)
   - Member_Dinner (member_id (FK) | dinner_id (FK))
   - Food_Dinner (food_code (FK) | dinner_id(FK))
   - Venue_Dinner (venue_code (FK) | dinner_id(FK))

