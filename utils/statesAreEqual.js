// Function to check if two puzzle states are equal
module.exports = async function (state1, state2) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (state1[i][j] !== state2[i][j]) {
                return false;
            }
        }
    }
    return true;
};
