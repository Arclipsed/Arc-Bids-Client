export function buildOpenApiSpec(serverUrl = "https://arcbids.com") {
  const baseUrl = serverUrl.replace(/\/$/, "");

  return {
    openapi: "3.0.3",
    info: {
      title: "ArcBids API",
      version: "1.0.0",
      description:
        "Programmatic REST API for creating and managing ArcBids live wholesale auctions and auction items (lots).",
    },
    servers: [
      {
        url: baseUrl,
        description: "ArcBids API Server",
      },
    ],
    security: [{ BearerAuth: [] }],
    tags: [
      { name: "Spec", description: "OpenAPI / Swagger specification" },
      { name: "Account", description: "Authenticated account information" },
      { name: "BuyerLists", description: "Manage account buyer lists and members" },
      { name: "Auctions", description: "Manage auction rooms" },
      { name: "AuctionItems", description: "Manage lots inside an auction" },
    ],
    paths: {
      "/api/v1/swagger": {
        get: {
          tags: ["Spec"],
          summary: "Get OpenAPI (Swagger) specification",
          operationId: "getSwaggerSpec",
          security: [],
          responses: {
            "200": {
              description: "OpenAPI 3.0.3 JSON specification",
              content: {
                "application/json": {
                  schema: { type: "object" },
                },
              },
            },
          },
        },
      },
      "/api/v1/account": {
        get: {
          tags: ["Account"],
          summary: "Get Account",
          description:
            "Returns the authenticated account's profile, remaining auction tickets, and owned organizations.",
          operationId: "getAccount",
          responses: {
            "200": {
              description: "Account details",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Account" },
                },
              },
            },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "404": { $ref: "#/components/responses/NotFound" },
          },
        },
      },
      "/api/v1/buyer-lists": {
        get: {
          tags: ["BuyerLists"],
          summary: "List Buyer Lists",
          operationId: "listBuyerLists",
          responses: {
            "200": {
              description: "Buyer lists owned by the authenticated account",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      buyerLists: {
                        type: "array",
                        items: { $ref: "#/components/schemas/BuyerList" },
                      },
                    },
                    required: ["buyerLists"],
                  },
                },
              },
            },
            "401": { $ref: "#/components/responses/Unauthorized" },
          },
        },
        post: {
          tags: ["BuyerLists"],
          summary: "Create Buyer List",
          operationId: "createBuyerList",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateBuyerListRequest" },
              },
            },
          },
          responses: {
            "201": {
              description: "Buyer list created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/BuyerList" },
                },
              },
            },
            "400": { $ref: "#/components/responses/BadRequest" },
            "401": { $ref: "#/components/responses/Unauthorized" },
          },
        },
      },
      "/api/v1/buyer-lists/{listId}": {
        parameters: [
          {
            name: "listId",
            in: "path",
            required: true,
            description: "Buyer List ID",
            schema: { type: "string" },
          },
        ],
        patch: {
          tags: ["BuyerLists"],
          summary: "Update Buyer List",
          operationId: "updateBuyerList",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateBuyerListRequest" },
              },
            },
          },
          responses: {
            "200": {
              description: "Buyer list updated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/BuyerList" },
                },
              },
            },
            "400": { $ref: "#/components/responses/BadRequest" },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "404": { $ref: "#/components/responses/NotFound" },
          },
        },
        delete: {
          tags: ["BuyerLists"],
          summary: "Delete Buyer List",
          operationId: "deleteBuyerList",
          responses: {
            "200": {
              description: "Buyer list deleted",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      deleted: { type: "boolean", example: true },
                      listId: { type: "string" },
                    },
                    required: ["deleted", "listId"],
                  },
                },
              },
            },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "404": { $ref: "#/components/responses/NotFound" },
          },
        },
      },
      "/api/v1/buyer-lists/{listId}/members": {
        parameters: [
          {
            name: "listId",
            in: "path",
            required: true,
            description: "Buyer List ID",
            schema: { type: "string" },
          },
        ],
        get: {
          tags: ["BuyerLists"],
          summary: "List Buyer List Members",
          operationId: "listBuyerListMembers",
          responses: {
            "200": {
              description: "Members in the buyer list",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      members: {
                        type: "array",
                        items: { $ref: "#/components/schemas/BuyerListMember" },
                      },
                    },
                    required: ["members"],
                  },
                },
              },
            },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "404": { $ref: "#/components/responses/NotFound" },
          },
        },
        post: {
          tags: ["BuyerLists"],
          summary: "Add Buyer List Member",
          operationId: "addBuyerListMember",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AddBuyerListMemberRequest",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Member added",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/BuyerListMember" },
                },
              },
            },
            "400": { $ref: "#/components/responses/BadRequest" },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "404": { $ref: "#/components/responses/NotFound" },
          },
        },
      },
      "/api/v1/buyer-lists/{listId}/members/{memberId}": {
        parameters: [
          {
            name: "listId",
            in: "path",
            required: true,
            description: "Buyer List ID",
            schema: { type: "string" },
          },
          {
            name: "memberId",
            in: "path",
            required: true,
            description: "Buyer List Member ID",
            schema: { type: "string" },
          },
        ],
        patch: {
          tags: ["BuyerLists"],
          summary: "Update / Ban Buyer List Member",
          description:
            "Update a member's companyName or ban/unban them via isBanned.",
          operationId: "updateBuyerListMember",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateBuyerListMemberRequest",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Member updated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/BuyerListMember" },
                },
              },
            },
            "400": { $ref: "#/components/responses/BadRequest" },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "404": { $ref: "#/components/responses/NotFound" },
          },
        },
        delete: {
          tags: ["BuyerLists"],
          summary: "Remove Buyer List Member",
          operationId: "deleteBuyerListMember",
          responses: {
            "200": {
              description: "Member removed",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      deleted: { type: "boolean", example: true },
                      memberId: { type: "string" },
                    },
                    required: ["deleted", "memberId"],
                  },
                },
              },
            },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "404": { $ref: "#/components/responses/NotFound" },
          },
        },
      },
      "/api/v1/auctions": {
        get: {
          tags: ["Auctions"],
          summary: "List Auctions",
          operationId: "listAuctions",
          parameters: [
            {
              name: "orgId",
              in: "query",
              required: false,
              description: "Optional organization ID to filter auctions.",
              schema: { type: "string" },
            },
            {
              name: "status",
              in: "query",
              required: false,
              description: "Optional auction status filter.",
              schema: {
                type: "string",
                enum: ["Draft", "Lobby", "Live", "Ended"],
              },
            },
          ],
          responses: {
            "200": {
              description: "List of auctions belonging to the authenticated account",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      auctions: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Auction" },
                      },
                    },
                    required: ["auctions"],
                  },
                },
              },
            },
            "401": { $ref: "#/components/responses/Unauthorized" },
          },
        },
        post: {
          tags: ["Auctions"],
          summary: "Create Auction",
          operationId: "createAuction",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateAuctionRequest" },
              },
            },
          },
          responses: {
            "201": {
              description: "Auction created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Auction" },
                },
              },
            },
            "400": { $ref: "#/components/responses/BadRequest" },
            "401": { $ref: "#/components/responses/Unauthorized" },
          },
        },
      },
      "/api/v1/auctions/{auctionId}": {
        parameters: [
          {
            name: "auctionId",
            in: "path",
            required: true,
            description: "Auction ID",
            schema: { type: "string" },
          },
        ],
        patch: {
          tags: ["Auctions"],
          summary: "Update Auction",
          operationId: "updateAuction",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateAuctionRequest" },
              },
            },
          },
          responses: {
            "200": {
              description: "Auction updated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Auction" },
                },
              },
            },
            "400": { $ref: "#/components/responses/BadRequest" },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "404": { $ref: "#/components/responses/NotFound" },
          },
        },
        delete: {
          tags: ["Auctions"],
          summary: "Delete Auction",
          operationId: "deleteAuction",
          responses: {
            "200": {
              description: "Auction deleted",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      deleted: { type: "boolean", example: true },
                      auctionId: { type: "string" },
                    },
                    required: ["deleted", "auctionId"],
                  },
                },
              },
            },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "404": { $ref: "#/components/responses/NotFound" },
          },
        },
      },
      "/api/v1/auctions/{auctionId}/start": {
        parameters: [
          {
            name: "auctionId",
            in: "path",
            required: true,
            description: "Auction ID",
            schema: { type: "string" },
          },
        ],
        post: {
          tags: ["Auctions"],
          summary: "Start Auction",
          description:
            "Starts a Draft or Lobby auction immediately (reserves 1 Auction Ticket if not already paid, activates the first queued lot, and locks the auction and its items from further edits).",
          operationId: "startAuction",
          responses: {
            "200": {
              description: "Auction is now live",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Auction" },
                },
              },
            },
            "400": { $ref: "#/components/responses/BadRequest" },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "404": { $ref: "#/components/responses/NotFound" },
          },
        },
      },
      "/api/v1/auctions/{auctionId}/items": {
        parameters: [
          {
            name: "auctionId",
            in: "path",
            required: true,
            description: "Auction ID",
            schema: { type: "string" },
          },
        ],
        get: {
          tags: ["AuctionItems"],
          summary: "List Auction Items",
          operationId: "listAuctionItems",
          responses: {
            "200": {
              description: "List of items (lots) in the auction",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      items: {
                        type: "array",
                        items: { $ref: "#/components/schemas/AuctionItem" },
                      },
                    },
                    required: ["items"],
                  },
                },
              },
            },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "404": { $ref: "#/components/responses/NotFound" },
          },
        },
        post: {
          tags: ["AuctionItems"],
          summary: "Create Auction Item",
          operationId: "createAuctionItem",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CreateAuctionItemRequest",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Auction item created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuctionItem" },
                },
              },
            },
            "400": { $ref: "#/components/responses/BadRequest" },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "404": { $ref: "#/components/responses/NotFound" },
          },
        },
      },
      "/api/v1/auctions/{auctionId}/items/{itemId}": {
        parameters: [
          {
            name: "auctionId",
            in: "path",
            required: true,
            description: "Auction ID",
            schema: { type: "string" },
          },
          {
            name: "itemId",
            in: "path",
            required: true,
            description: "Auction Item (Lot) ID",
            schema: { type: "string" },
          },
        ],
        patch: {
          tags: ["AuctionItems"],
          summary: "Update Auction Item",
          operationId: "updateAuctionItem",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateAuctionItemRequest",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Auction item updated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AuctionItem" },
                },
              },
            },
            "400": { $ref: "#/components/responses/BadRequest" },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "404": { $ref: "#/components/responses/NotFound" },
          },
        },
        delete: {
          tags: ["AuctionItems"],
          summary: "Delete Auction Item",
          operationId: "deleteAuctionItem",
          responses: {
            "200": {
              description: "Auction item deleted",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      deleted: { type: "boolean", example: true },
                      itemId: { type: "string" },
                    },
                    required: ["deleted", "itemId"],
                  },
                },
              },
            },
            "401": { $ref: "#/components/responses/Unauthorized" },
            "404": { $ref: "#/components/responses/NotFound" },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "API Key",
          description: "Use your ArcBids secret API key (`ab_live_...`).",
        },
      },
      responses: {
        BadRequest: {
          description: "Invalid request payload or parameters",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        Unauthorized: {
          description: "Missing, invalid, or revoked API key",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        NotFound: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "Unauthorized" },
          },
          required: ["error"],
        },
        Account: {
          type: "object",
          properties: {
            identity: { type: "string" },
            email: { type: "string", format: "email" },
            auctionCredits: { type: "integer", minimum: 0, example: 5 },
            createdAt: { type: "string", format: "date-time", nullable: true },
            lastLoginAt: { type: "string", format: "date-time", nullable: true },
            organizations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  slug: { type: "string" },
                  contactEmail: { type: "string" },
                  phone: { type: "string" },
                  website: { type: "string" },
                  vatNumber: { type: "string" },
                  description: { type: "string" },
                },
                required: ["id", "name", "slug"],
              },
            },
          },
          required: ["identity", "email", "auctionCredits", "organizations"],
        },
        BuyerList: {
          type: "object",
          properties: {
            id: { type: "string", example: "482910384" },
            name: { type: "string", example: "VIP Wholesale Buyers" },
            description: { type: "string", example: "Verified EU partners" },
            memberCount: { type: "integer", minimum: 0, example: 12 },
          },
          required: ["id", "name", "description", "memberCount"],
        },
        CreateBuyerListRequest: {
          type: "object",
          properties: {
            name: { type: "string", example: "VIP Wholesale Buyers" },
            description: { type: "string", default: "" },
          },
          required: ["name"],
        },
        UpdateBuyerListRequest: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
          },
        },
        BuyerListMember: {
          type: "object",
          properties: {
            id: { type: "string", example: "739104821" },
            listId: { type: "string", example: "482910384" },
            companyName: { type: "string", example: "Nordic Trade GmbH" },
            email: { type: "string", example: "buyer@nordictrade.de" },
            isBanned: { type: "boolean", example: false },
          },
          required: ["id", "listId", "companyName", "email", "isBanned"],
        },
        AddBuyerListMemberRequest: {
          type: "object",
          properties: {
            companyName: { type: "string", example: "Nordic Trade GmbH" },
            email: {
              type: "string",
              description: "Buyer email address or phone number.",
              example: "buyer@nordictrade.de",
            },
          },
          required: ["companyName", "email"],
        },
        UpdateBuyerListMemberRequest: {
          type: "object",
          properties: {
            companyName: { type: "string" },
            isBanned: { type: "boolean" },
          },
        },
        Auction: {
          type: "object",
          properties: {
            id: { type: "string", example: "1048291042" },
            orgId: { type: "string", example: "92018412" },
            title: { type: "string", example: "Q2 Wholesale Drop" },
            status: {
              type: "string",
              enum: ["Draft", "Lobby", "Live", "Ended"],
              example: "Draft",
            },
            currency: {
              type: "string",
              enum: ["EUR", "USD"],
              example: "EUR",
            },
            scheduledAt: {
              type: "string",
              format: "date-time",
              nullable: true,
              example: "2026-12-01T14:00:00Z",
            },
            isPublic: { type: "boolean", example: false },
            roomCode: { type: "string", example: "k8x3m9p2qa" },
            allowedListIds: {
              type: "array",
              items: { type: "string" },
              example: [],
            },
            allowAutoBid: { type: "boolean", example: true },
            isPaid: { type: "boolean", example: false },
          },
          required: [
            "id",
            "orgId",
            "title",
            "status",
            "currency",
            "isPublic",
            "roomCode",
            "allowedListIds",
            "allowAutoBid",
            "isPaid",
          ],
        },
        CreateAuctionRequest: {
          type: "object",
          properties: {
            orgId: {
              type: "string",
              description:
                "Organization ID. Optional if your account only has one organization.",
            },
            title: { type: "string", example: "Q2 Wholesale Drop" },
            currency: {
              type: "string",
              enum: ["EUR", "USD"],
              default: "EUR",
            },
            scheduledAt: {
              type: "string",
              format: "date-time",
              nullable: true,
              description:
                "ISO-8601 UTC timestamp. Scheduling reserves 1 Auction Ticket.",
            },
            isPublic: { type: "boolean", default: false },
            allowedListIds: {
              type: "array",
              items: { type: "string" },
              default: [],
            },
            allowAutoBid: { type: "boolean", default: true },
          },
          required: ["title"],
        },
        UpdateAuctionRequest: {
          type: "object",
          properties: {
            title: { type: "string", example: "Q2 Wholesale Drop (Updated)" },
            currency: { type: "string", enum: ["EUR", "USD"] },
            scheduledAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            isPublic: { type: "boolean" },
            allowedListIds: {
              type: "array",
              items: { type: "string" },
            },
            allowAutoBid: { type: "boolean" },
          },
        },
        AuctionItem: {
          type: "object",
          properties: {
            id: { type: "string", example: "583920194" },
            roomId: { type: "string", example: "1048291042" },
            orderIndex: { type: "integer", minimum: 0, example: 0 },
            title: { type: "string", example: "50x iPhone 15 Pro 256GB Grade A" },
            description: {
              type: "string",
              example: "Tested, unlocked, 90%+ battery health.",
            },
            images: {
              type: "array",
              items: { type: "string", format: "uri" },
            },
            startingPrice: {
              type: "integer",
              description: "Starting price in minor currency units (cents).",
              example: 2500000,
            },
            currentBid: {
              type: "integer",
              description: "Current highest bid in minor currency units (cents).",
              example: 2500000,
            },
            status: {
              type: "string",
              enum: ["Queued", "Active", "Sold", "Unsold"],
              example: "Queued",
            },
            quantity: { type: "integer", minimum: 1, example: 50 },
            category: { type: "string", example: "Smartphones" },
            metadataJson: {
              type: "string",
              description: "Optional JSON string of category attributes.",
              example: "{\"grade\":\"A\",\"storage\":\"256GB\"}",
            },
            lotDurationSec: { type: "integer", minimum: 1, example: 120 },
            antiSnipeSec: { type: "integer", minimum: 0, example: 15 },
            minBidIncrement: {
              type: "integer",
              description: "Minimum bid increment in cents.",
              example: 5000,
            },
          },
          required: [
            "id",
            "roomId",
            "orderIndex",
            "title",
            "description",
            "images",
            "startingPrice",
            "currentBid",
            "status",
            "quantity",
            "category",
            "metadataJson",
            "lotDurationSec",
            "antiSnipeSec",
            "minBidIncrement",
          ],
        },
        CreateAuctionItemRequest: {
          type: "object",
          properties: {
            orderIndex: { type: "integer", minimum: 0, default: 0 },
            title: { type: "string", example: "50x iPhone 15 Pro 256GB Grade A" },
            description: { type: "string", default: "" },
            images: {
              type: "array",
              items: { type: "string", format: "uri" },
              default: [],
            },
            startingPrice: {
              type: "integer",
              minimum: 0,
              description: "Starting price in cents.",
              example: 2500000,
            },
            quantity: { type: "integer", minimum: 1, default: 1 },
            category: { type: "string", default: "General" },
            metadataJson: { type: "string", default: "" },
            lotDurationSec: { type: "integer", minimum: 1, default: 120 },
            antiSnipeSec: { type: "integer", minimum: 0, default: 15 },
            minBidIncrement: {
              type: "integer",
              minimum: 1,
              description: "Minimum bid increment in cents.",
              default: 5000,
            },
          },
          required: ["title", "startingPrice"],
        },
        UpdateAuctionItemRequest: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            images: {
              type: "array",
              items: { type: "string", format: "uri" },
            },
            startingPrice: { type: "integer", minimum: 0 },
            quantity: { type: "integer", minimum: 1 },
            category: { type: "string" },
            metadataJson: { type: "string" },
            lotDurationSec: { type: "integer", minimum: 1 },
            antiSnipeSec: { type: "integer", minimum: 0 },
            minBidIncrement: { type: "integer", minimum: 1 },
          },
        },
      },
    },
  };
}
