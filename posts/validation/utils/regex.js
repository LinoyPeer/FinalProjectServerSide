const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;;

const phoneRegex = /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/;

module.exports = { urlRegex, phoneRegex }

// const likeCard = async (cardId, userId) => {
//     try {
//         let card = await Card.findById(cardId);
//         if (!card) {
//             const error = new Error(
//                 "A card with this ID cannot be found in the database"
//             );
//             error.status = 404;
//             return createError("Mongoose", error);
//         }
//         if (card.likes.includes(userId)) {
//             let newLikesArray = card.likes.filter((id) => id != userId);
//             card.likes = newLikesArray;
//         } else {
//             card.likes.push(userId);
//         }
//         await card.save();
//         return card;
//     } catch (error) {
//         return createError("Mongoose", error);
//     }
// };
