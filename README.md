# geo-location-to-db
This project enable an user to select a location on google maps and then uploads the longitude and latitude to a database.

1. The add-location script when executed opens a google map. 
2. The user can type in a location name in the search box.
3. The map shows relevant results to the location name typed by user in the search box.
4. When clicked on any of the search results, the map shows a marker.
5. The user can click on the marker, then a form pops up.
6. After filling the appropriate details in the form, the user should then click on upload.
7. This will then add the details entered by the user and geo-location (latitude and longitude) of the marker from the map into the database.
8. The file '/geo-locaiton-db/admin/query/add-location-query.php' executes the query which uploads values to database.
9. The user can modify the query to suit his type of database
9. The database used for this project had a table with following columns:
  	   
        machine_id
        id
        name
        type
        description
        street
        route
        area
        city
        state
        country
        pin
        lat //latitude
        lng //longitude
