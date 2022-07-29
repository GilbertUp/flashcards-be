"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQuery = exports.User = void 0;
const nexus_1 = require("nexus");
exports.User = (0, nexus_1.objectType)({
    name: "User",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("email");
        t.nonNull.string("names");
        t.nonNull.list.nonNull.field("flashcards", {
            type: "Flashcard",
            resolve(parent, args, context) {
                return context.prisma.user
                    .findUnique({ where: { id: parent.id } })
                    .flashCards();
            },
        });
    },
});
exports.userQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("users", {
            type: "User",
            resolve(parent, args, context, info) {
                return context.prisma.user.findMany();
            },
        });
    },
});
//# sourceMappingURL=User.js.map