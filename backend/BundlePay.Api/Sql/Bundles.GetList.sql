SELECT
    b."Id" AS "BundleId",
    b."Name" AS "BundleName",
    b."Description" AS "BundleDescription",
    b."Price" AS "BundlePrice",
    b."IsActive" AS "BundleIsActive",
    b."BundleType" AS "BundleType",
    b."CreatedAt" AS "BundleCreatedAt",
    bi."Quantity" AS "ItemQuantity",
    bi."SortOrder" AS "ItemSortOrder",
    s."Id" AS "ServiceId",
    s."Name" AS "ServiceName",
    s."Price" AS "ServicePrice"
FROM "Bundles" b
LEFT JOIN "BundleItems" bi ON bi."BundleId" = b."Id"
LEFT JOIN "Services" s ON s."Id" = bi."ServiceId"
ORDER BY b."CreatedAt" DESC, bi."SortOrder";
