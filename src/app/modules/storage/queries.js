module.exports = {
    getAllUsers: `
        SELECT id AS userId
            ,name
            ,phone
            ,status
        FROM users;
    `,

    getUser: `
        SELECT id AS userId
            ,name
            ,phone
            ,status
        FROM users
        WHERE user_id = :userId;
    `,

    setUser: `
        INSERT INTO users (name, phone) VALUES (:name, :phone);
    `,

    getLastUserId: `
        SELECT LAST_INSERT_ID() AS userId;
    `,
};
