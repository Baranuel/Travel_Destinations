export const getDestinations = async (req, res) => {
  //we declare an asynchronous function so we can await changes from database
  try {
    //we create our query, assign it to a variable and await it
    // const destinations = await client
    //   .db("travel_destinations")
    //   .collection("destinations")
    //   .find()
    //   .toArray();

    const allDestinations = await Destination.find();
    res.status(200).json(allDestinations);
  } catch (err) {
    console.log(err);
  }
};
