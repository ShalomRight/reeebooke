module.exports = [
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/foreign-keys.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ForeignKey",
    ()=>ForeignKey,
    "ForeignKeyBuilder",
    ()=>ForeignKeyBuilder,
    "foreignKey",
    ()=>foreignKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/table.utils.js [app-rsc] (ecmascript)");
;
;
class ForeignKeyBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteForeignKeyBuilder";
    /** @internal */ reference;
    /** @internal */ _onUpdate;
    /** @internal */ _onDelete;
    constructor(config, actions){
        this.reference = ()=>{
            const { name, columns, foreignColumns } = config();
            return {
                name,
                columns,
                foreignTable: foreignColumns[0].table,
                foreignColumns
            };
        };
        if (actions) {
            this._onUpdate = actions.onUpdate;
            this._onDelete = actions.onDelete;
        }
    }
    onUpdate(action) {
        this._onUpdate = action;
        return this;
    }
    onDelete(action) {
        this._onDelete = action;
        return this;
    }
    /** @internal */ build(table) {
        return new ForeignKey(table, this);
    }
}
class ForeignKey {
    constructor(table, builder){
        this.table = table;
        this.reference = builder.reference;
        this.onUpdate = builder._onUpdate;
        this.onDelete = builder._onDelete;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteForeignKey";
    reference;
    onUpdate;
    onDelete;
    getName() {
        const { name, columns, foreignColumns } = this.reference();
        const columnNames = columns.map((column)=>column.name);
        const foreignColumnNames = foreignColumns.map((column)=>column.name);
        const chunks = [
            this.table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TableName"]],
            ...columnNames,
            foreignColumns[0].table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TableName"]],
            ...foreignColumnNames
        ];
        return name ?? `${chunks.join("_")}_fk`;
    }
}
function foreignKey(config) {
    function mappedConfig() {
        if (typeof config === "function") {
            const { name, columns, foreignColumns } = config();
            return {
                name,
                columns,
                foreignColumns
            };
        }
        return config;
    }
    return new ForeignKeyBuilder(mappedConfig);
}
;
 //# sourceMappingURL=foreign-keys.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/unique-constraint.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UniqueConstraint",
    ()=>UniqueConstraint,
    "UniqueConstraintBuilder",
    ()=>UniqueConstraintBuilder,
    "UniqueOnConstraintBuilder",
    ()=>UniqueOnConstraintBuilder,
    "unique",
    ()=>unique,
    "uniqueKeyName",
    ()=>uniqueKeyName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/table.utils.js [app-rsc] (ecmascript)");
;
;
function uniqueKeyName(table, columns) {
    return `${table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TableName"]]}_${columns.join("_")}_unique`;
}
function unique(name) {
    return new UniqueOnConstraintBuilder(name);
}
class UniqueConstraintBuilder {
    constructor(columns, name){
        this.name = name;
        this.columns = columns;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteUniqueConstraintBuilder";
    /** @internal */ columns;
    /** @internal */ build(table) {
        return new UniqueConstraint(table, this.columns, this.name);
    }
}
class UniqueOnConstraintBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteUniqueOnConstraintBuilder";
    /** @internal */ name;
    constructor(name){
        this.name = name;
    }
    on(...columns) {
        return new UniqueConstraintBuilder(columns, this.name);
    }
}
class UniqueConstraint {
    constructor(table, columns, name){
        this.table = table;
        this.columns = columns;
        this.name = name ?? uniqueKeyName(this.table, this.columns.map((column)=>column.name));
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteUniqueConstraint";
    columns;
    name;
    getName() {
        return this.name;
    }
}
;
 //# sourceMappingURL=unique-constraint.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/common.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SQLiteColumn",
    ()=>SQLiteColumn,
    "SQLiteColumnBuilder",
    ()=>SQLiteColumnBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$column$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/column-builder.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/column.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$foreign$2d$keys$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/foreign-keys.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$unique$2d$constraint$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/unique-constraint.js [app-rsc] (ecmascript)");
;
;
;
;
;
class SQLiteColumnBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$column$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteColumnBuilder";
    foreignKeyConfigs = [];
    references(ref, actions = {}) {
        this.foreignKeyConfigs.push({
            ref,
            actions
        });
        return this;
    }
    unique(name) {
        this.config.isUnique = true;
        this.config.uniqueName = name;
        return this;
    }
    generatedAlwaysAs(as, config) {
        this.config.generated = {
            as,
            type: "always",
            mode: config?.mode ?? "virtual"
        };
        return this;
    }
    /** @internal */ buildForeignKeys(column, table) {
        return this.foreignKeyConfigs.map(({ ref, actions })=>{
            return ((ref2, actions2)=>{
                const builder = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$foreign$2d$keys$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ForeignKeyBuilder"](()=>{
                    const foreignColumn = ref2();
                    return {
                        columns: [
                            column
                        ],
                        foreignColumns: [
                            foreignColumn
                        ]
                    };
                });
                if (actions2.onUpdate) {
                    builder.onUpdate(actions2.onUpdate);
                }
                if (actions2.onDelete) {
                    builder.onDelete(actions2.onDelete);
                }
                return builder.build(table);
            })(ref, actions);
        });
    }
}
class SQLiteColumn extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"] {
    constructor(table, config){
        if (!config.uniqueName) {
            config.uniqueName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$unique$2d$constraint$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uniqueKeyName"])(table, [
                config.name
            ]);
        }
        super(table, config);
        this.table = table;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteColumn";
}
;
 //# sourceMappingURL=common.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/blob.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SQLiteBigInt",
    ()=>SQLiteBigInt,
    "SQLiteBigIntBuilder",
    ()=>SQLiteBigIntBuilder,
    "SQLiteBlobBuffer",
    ()=>SQLiteBlobBuffer,
    "SQLiteBlobBufferBuilder",
    ()=>SQLiteBlobBufferBuilder,
    "SQLiteBlobJson",
    ()=>SQLiteBlobJson,
    "SQLiteBlobJsonBuilder",
    ()=>SQLiteBlobJsonBuilder,
    "blob",
    ()=>blob
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class SQLiteBigIntBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteBigIntBuilder";
    constructor(name){
        super(name, "bigint", "SQLiteBigInt");
    }
    /** @internal */ build(table) {
        return new SQLiteBigInt(table, this.config);
    }
}
class SQLiteBigInt extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteBigInt";
    getSQLType() {
        return "blob";
    }
    mapFromDriverValue(value) {
        if (typeof Buffer !== "undefined" && Buffer.from) {
            const buf = Buffer.isBuffer(value) ? value : value instanceof ArrayBuffer ? Buffer.from(value) : value.buffer ? Buffer.from(value.buffer, value.byteOffset, value.byteLength) : Buffer.from(value);
            return BigInt(buf.toString("utf8"));
        }
        return BigInt(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["textDecoder"].decode(value));
    }
    mapToDriverValue(value) {
        return Buffer.from(value.toString());
    }
}
class SQLiteBlobJsonBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteBlobJsonBuilder";
    constructor(name){
        super(name, "json", "SQLiteBlobJson");
    }
    /** @internal */ build(table) {
        return new SQLiteBlobJson(table, this.config);
    }
}
class SQLiteBlobJson extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteBlobJson";
    getSQLType() {
        return "blob";
    }
    mapFromDriverValue(value) {
        if (typeof Buffer !== "undefined" && Buffer.from) {
            const buf = Buffer.isBuffer(value) ? value : value instanceof ArrayBuffer ? Buffer.from(value) : value.buffer ? Buffer.from(value.buffer, value.byteOffset, value.byteLength) : Buffer.from(value);
            return JSON.parse(buf.toString("utf8"));
        }
        return JSON.parse(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["textDecoder"].decode(value));
    }
    mapToDriverValue(value) {
        return Buffer.from(JSON.stringify(value));
    }
}
class SQLiteBlobBufferBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteBlobBufferBuilder";
    constructor(name){
        super(name, "buffer", "SQLiteBlobBuffer");
    }
    /** @internal */ build(table) {
        return new SQLiteBlobBuffer(table, this.config);
    }
}
class SQLiteBlobBuffer extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteBlobBuffer";
    mapFromDriverValue(value) {
        if (Buffer.isBuffer(value)) {
            return value;
        }
        return Buffer.from(value);
    }
    getSQLType() {
        return "blob";
    }
}
function blob(a, b) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    if (config?.mode === "json") {
        return new SQLiteBlobJsonBuilder(name);
    }
    if (config?.mode === "bigint") {
        return new SQLiteBigIntBuilder(name);
    }
    return new SQLiteBlobBufferBuilder(name);
}
;
 //# sourceMappingURL=blob.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/custom.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SQLiteCustomColumn",
    ()=>SQLiteCustomColumn,
    "SQLiteCustomColumnBuilder",
    ()=>SQLiteCustomColumnBuilder,
    "customType",
    ()=>customType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class SQLiteCustomColumnBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteCustomColumnBuilder";
    constructor(name, fieldConfig, customTypeParams){
        super(name, "custom", "SQLiteCustomColumn");
        this.config.fieldConfig = fieldConfig;
        this.config.customTypeParams = customTypeParams;
    }
    /** @internal */ build(table) {
        return new SQLiteCustomColumn(table, this.config);
    }
}
class SQLiteCustomColumn extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteCustomColumn";
    sqlName;
    mapTo;
    mapFrom;
    constructor(table, config){
        super(table, config);
        this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
        this.mapTo = config.customTypeParams.toDriver;
        this.mapFrom = config.customTypeParams.fromDriver;
    }
    getSQLType() {
        return this.sqlName;
    }
    mapFromDriverValue(value) {
        return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
    }
    mapToDriverValue(value) {
        return typeof this.mapTo === "function" ? this.mapTo(value) : value;
    }
}
function customType(customTypeParams) {
    return (a, b)=>{
        const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
        return new SQLiteCustomColumnBuilder(name, config, customTypeParams);
    };
}
;
 //# sourceMappingURL=custom.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/integer.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SQLiteBaseInteger",
    ()=>SQLiteBaseInteger,
    "SQLiteBaseIntegerBuilder",
    ()=>SQLiteBaseIntegerBuilder,
    "SQLiteBoolean",
    ()=>SQLiteBoolean,
    "SQLiteBooleanBuilder",
    ()=>SQLiteBooleanBuilder,
    "SQLiteInteger",
    ()=>SQLiteInteger,
    "SQLiteIntegerBuilder",
    ()=>SQLiteIntegerBuilder,
    "SQLiteTimestamp",
    ()=>SQLiteTimestamp,
    "SQLiteTimestampBuilder",
    ()=>SQLiteTimestampBuilder,
    "int",
    ()=>int,
    "integer",
    ()=>integer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
;
class SQLiteBaseIntegerBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteBaseIntegerBuilder";
    constructor(name, dataType, columnType){
        super(name, dataType, columnType);
        this.config.autoIncrement = false;
    }
    primaryKey(config) {
        if (config?.autoIncrement) {
            this.config.autoIncrement = true;
        }
        this.config.hasDefault = true;
        return super.primaryKey();
    }
}
class SQLiteBaseInteger extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteBaseInteger";
    autoIncrement = this.config.autoIncrement;
    getSQLType() {
        return "integer";
    }
}
class SQLiteIntegerBuilder extends SQLiteBaseIntegerBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteIntegerBuilder";
    constructor(name){
        super(name, "number", "SQLiteInteger");
    }
    build(table) {
        return new SQLiteInteger(table, this.config);
    }
}
class SQLiteInteger extends SQLiteBaseInteger {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteInteger";
}
class SQLiteTimestampBuilder extends SQLiteBaseIntegerBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteTimestampBuilder";
    constructor(name, mode){
        super(name, "date", "SQLiteTimestamp");
        this.config.mode = mode;
    }
    /**
   * @deprecated Use `default()` with your own expression instead.
   *
   * Adds `DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer))` to the column, which is the current epoch timestamp in milliseconds.
   */ defaultNow() {
        return this.default(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
    }
    build(table) {
        return new SQLiteTimestamp(table, this.config);
    }
}
class SQLiteTimestamp extends SQLiteBaseInteger {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteTimestamp";
    mode = this.config.mode;
    mapFromDriverValue(value) {
        if (this.config.mode === "timestamp") {
            return new Date(value * 1e3);
        }
        return new Date(value);
    }
    mapToDriverValue(value) {
        const unix = value.getTime();
        if (this.config.mode === "timestamp") {
            return Math.floor(unix / 1e3);
        }
        return unix;
    }
}
class SQLiteBooleanBuilder extends SQLiteBaseIntegerBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteBooleanBuilder";
    constructor(name, mode){
        super(name, "boolean", "SQLiteBoolean");
        this.config.mode = mode;
    }
    build(table) {
        return new SQLiteBoolean(table, this.config);
    }
}
class SQLiteBoolean extends SQLiteBaseInteger {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteBoolean";
    mode = this.config.mode;
    mapFromDriverValue(value) {
        return Number(value) === 1;
    }
    mapToDriverValue(value) {
        return value ? 1 : 0;
    }
}
function integer(a, b) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    if (config?.mode === "timestamp" || config?.mode === "timestamp_ms") {
        return new SQLiteTimestampBuilder(name, config.mode);
    }
    if (config?.mode === "boolean") {
        return new SQLiteBooleanBuilder(name, config.mode);
    }
    return new SQLiteIntegerBuilder(name);
}
const int = integer;
;
 //# sourceMappingURL=integer.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/numeric.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SQLiteNumeric",
    ()=>SQLiteNumeric,
    "SQLiteNumericBigInt",
    ()=>SQLiteNumericBigInt,
    "SQLiteNumericBigIntBuilder",
    ()=>SQLiteNumericBigIntBuilder,
    "SQLiteNumericBuilder",
    ()=>SQLiteNumericBuilder,
    "SQLiteNumericNumber",
    ()=>SQLiteNumericNumber,
    "SQLiteNumericNumberBuilder",
    ()=>SQLiteNumericNumberBuilder,
    "numeric",
    ()=>numeric
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class SQLiteNumericBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteNumericBuilder";
    constructor(name){
        super(name, "string", "SQLiteNumeric");
    }
    /** @internal */ build(table) {
        return new SQLiteNumeric(table, this.config);
    }
}
class SQLiteNumeric extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteNumeric";
    mapFromDriverValue(value) {
        if (typeof value === "string") return value;
        return String(value);
    }
    getSQLType() {
        return "numeric";
    }
}
class SQLiteNumericNumberBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteNumericNumberBuilder";
    constructor(name){
        super(name, "number", "SQLiteNumericNumber");
    }
    /** @internal */ build(table) {
        return new SQLiteNumericNumber(table, this.config);
    }
}
class SQLiteNumericNumber extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteNumericNumber";
    mapFromDriverValue(value) {
        if (typeof value === "number") return value;
        return Number(value);
    }
    mapToDriverValue = String;
    getSQLType() {
        return "numeric";
    }
}
class SQLiteNumericBigIntBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteNumericBigIntBuilder";
    constructor(name){
        super(name, "bigint", "SQLiteNumericBigInt");
    }
    /** @internal */ build(table) {
        return new SQLiteNumericBigInt(table, this.config);
    }
}
class SQLiteNumericBigInt extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteNumericBigInt";
    mapFromDriverValue = BigInt;
    mapToDriverValue = String;
    getSQLType() {
        return "numeric";
    }
}
function numeric(a, b) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    const mode = config?.mode;
    return mode === "number" ? new SQLiteNumericNumberBuilder(name) : mode === "bigint" ? new SQLiteNumericBigIntBuilder(name) : new SQLiteNumericBuilder(name);
}
;
 //# sourceMappingURL=numeric.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/real.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SQLiteReal",
    ()=>SQLiteReal,
    "SQLiteRealBuilder",
    ()=>SQLiteRealBuilder,
    "real",
    ()=>real
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/common.js [app-rsc] (ecmascript)");
;
;
class SQLiteRealBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteRealBuilder";
    constructor(name){
        super(name, "number", "SQLiteReal");
    }
    /** @internal */ build(table) {
        return new SQLiteReal(table, this.config);
    }
}
class SQLiteReal extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteReal";
    getSQLType() {
        return "real";
    }
}
function real(name) {
    return new SQLiteRealBuilder(name ?? "");
}
;
 //# sourceMappingURL=real.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/text.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SQLiteText",
    ()=>SQLiteText,
    "SQLiteTextBuilder",
    ()=>SQLiteTextBuilder,
    "SQLiteTextJson",
    ()=>SQLiteTextJson,
    "SQLiteTextJsonBuilder",
    ()=>SQLiteTextJsonBuilder,
    "text",
    ()=>text
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/common.js [app-rsc] (ecmascript)");
;
;
;
class SQLiteTextBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteTextBuilder";
    constructor(name, config){
        super(name, "string", "SQLiteText");
        this.config.enumValues = config.enum;
        this.config.length = config.length;
    }
    /** @internal */ build(table) {
        return new SQLiteText(table, this.config);
    }
}
class SQLiteText extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteText";
    enumValues = this.config.enumValues;
    length = this.config.length;
    constructor(table, config){
        super(table, config);
    }
    getSQLType() {
        return `text${this.config.length ? `(${this.config.length})` : ""}`;
    }
}
class SQLiteTextJsonBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumnBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteTextJsonBuilder";
    constructor(name){
        super(name, "json", "SQLiteTextJson");
    }
    /** @internal */ build(table) {
        return new SQLiteTextJson(table, this.config);
    }
}
class SQLiteTextJson extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumn"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteTextJson";
    getSQLType() {
        return "text";
    }
    mapFromDriverValue(value) {
        return JSON.parse(value);
    }
    mapToDriverValue(value) {
        return JSON.stringify(value);
    }
}
function text(a, b = {}) {
    const { name, config } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getColumnNameAndConfig"])(a, b);
    if (config.mode === "json") {
        return new SQLiteTextJsonBuilder(name);
    }
    return new SQLiteTextBuilder(name, config);
}
;
 //# sourceMappingURL=text.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/all.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSQLiteColumnBuilders",
    ()=>getSQLiteColumnBuilders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$blob$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/blob.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$custom$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/custom.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/integer.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/numeric.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/real.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/text.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
function getSQLiteColumnBuilders() {
    return {
        blob: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$blob$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blob"],
        customType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$custom$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["customType"],
        integer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["integer"],
        numeric: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["numeric"],
        real: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["real"],
        text: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["text"]
    };
}
;
 //# sourceMappingURL=all.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/table.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineForeignKeys",
    ()=>InlineForeignKeys,
    "SQLiteTable",
    ()=>SQLiteTable,
    "sqliteTable",
    ()=>sqliteTable,
    "sqliteTableCreator",
    ()=>sqliteTableCreator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$all$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/all.js [app-rsc] (ecmascript)");
;
;
;
const InlineForeignKeys = Symbol.for("drizzle:SQLiteInlineForeignKeys");
class SQLiteTable extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteTable";
    /** @internal */ static Symbol = Object.assign({}, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol, {
        InlineForeignKeys
    });
    /** @internal */ [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns];
    /** @internal */ [InlineForeignKeys] = [];
    /** @internal */ [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.ExtraConfigBuilder] = void 0;
}
function sqliteTableBase(name, columns, extraConfig, schema, baseName = name) {
    const rawTable = new SQLiteTable(name, schema, baseName);
    const parsedColumns = typeof columns === "function" ? columns((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$all$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSQLiteColumnBuilders"])()) : columns;
    const builtColumns = Object.fromEntries(Object.entries(parsedColumns).map(([name2, colBuilderBase])=>{
        const colBuilder = colBuilderBase;
        colBuilder.setName(name2);
        const column = colBuilder.build(rawTable);
        rawTable[InlineForeignKeys].push(...colBuilder.buildForeignKeys(column, rawTable));
        return [
            name2,
            column
        ];
    }));
    const table = Object.assign(rawTable, builtColumns);
    table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns] = builtColumns;
    table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.ExtraConfigColumns] = builtColumns;
    if (extraConfig) {
        table[SQLiteTable.Symbol.ExtraConfigBuilder] = extraConfig;
    }
    return table;
}
const sqliteTable = (name, columns, extraConfig)=>{
    return sqliteTableBase(name, columns, extraConfig);
};
function sqliteTableCreator(customizeTableName) {
    return (name, columns, extraConfig)=>{
        return sqliteTableBase(customizeTableName(name), columns, extraConfig, void 0, name);
    };
}
;
 //# sourceMappingURL=table.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/view-base.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SQLiteViewBase",
    ()=>SQLiteViewBase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
;
;
class SQLiteViewBase extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["View"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteViewBase";
}
;
 //# sourceMappingURL=view-base.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/dialect.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SQLiteAsyncDialect",
    ()=>SQLiteAsyncDialect,
    "SQLiteDialect",
    ()=>SQLiteDialect,
    "SQLiteSyncDialect",
    ()=>SQLiteSyncDialect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/alias.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$casing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/casing.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/column.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/errors.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/relations.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/expressions/conditions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/columns/common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/subquery.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/view-common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$view$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/view-base.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
class SQLiteDialect {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteDialect";
    /** @internal */ casing;
    constructor(config){
        this.casing = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$casing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CasingCache"](config?.casing);
    }
    escapeName(name) {
        return `"${name.replace(/"/g, '""')}"`;
    }
    escapeParam(_num) {
        return "?";
    }
    escapeString(str) {
        return `'${str.replace(/'/g, "''")}'`;
    }
    buildWithCTE(queries) {
        if (!queries?.length) return void 0;
        const withSqlChunks = [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`with `
        ];
        for (const [i, w] of queries.entries()){
            withSqlChunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(w._.alias)} as (${w._.sql})`);
            if (i < queries.length - 1) {
                withSqlChunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `);
            }
        }
        withSqlChunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` `);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(withSqlChunks);
    }
    buildDeleteQuery({ table, where, returning, withList, limit, orderBy }) {
        const withSql = this.buildWithCTE(withList);
        const returningSql = returning ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` returning ${this.buildSelection(returning, {
            isSingleTable: true
        })}` : void 0;
        const whereSql = where ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` where ${where}` : void 0;
        const orderBySql = this.buildOrderBy(orderBy);
        const limitSql = this.buildLimit(limit);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${withSql}delete from ${table}${whereSql}${returningSql}${orderBySql}${limitSql}`;
    }
    buildUpdateSet(table, set) {
        const tableColumns = table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns];
        const columnNames = Object.keys(tableColumns).filter((colName)=>set[colName] !== void 0 || tableColumns[colName]?.onUpdateFn !== void 0);
        const setSize = columnNames.length;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(columnNames.flatMap((colName, i)=>{
            const col = tableColumns[colName];
            const onUpdateFnResult = col.onUpdateFn?.();
            const value = set[colName] ?? ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(onUpdateFnResult, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) ? onUpdateFnResult : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].param(onUpdateFnResult, col));
            const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(this.casing.getColumnCasing(col))} = ${value}`;
            if (i < setSize - 1) {
                return [
                    res,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(", ")
                ];
            }
            return [
                res
            ];
        }));
    }
    buildUpdateQuery({ table, set, where, returning, withList, joins, from, limit, orderBy }) {
        const withSql = this.buildWithCTE(withList);
        const setSql = this.buildUpdateSet(table, set);
        const fromSql = from && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join([
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(" from "),
            this.buildFromTable(from)
        ]);
        const joinsSql = this.buildJoins(joins);
        const returningSql = returning ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` returning ${this.buildSelection(returning, {
            isSingleTable: true
        })}` : void 0;
        const whereSql = where ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` where ${where}` : void 0;
        const orderBySql = this.buildOrderBy(orderBy);
        const limitSql = this.buildLimit(limit);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${withSql}update ${table} set ${setSql}${fromSql}${joinsSql}${whereSql}${returningSql}${orderBySql}${limitSql}`;
    }
    /**
   * Builds selection SQL with provided fields/expressions
   *
   * Examples:
   *
   * `select <selection> from`
   *
   * `insert ... returning <selection>`
   *
   * If `isSingleTable` is true, then columns won't be prefixed with table name
   */ buildSelection(fields, { isSingleTable = false } = {}) {
        const columnsLen = fields.length;
        const chunks = fields.flatMap(({ field }, i)=>{
            const chunk = [];
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased) && field.isSelectionField) {
                chunk.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(field.fieldAlias));
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
                const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased) ? field.sql : field;
                if (isSingleTable) {
                    chunk.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"](query.queryChunks.map((c)=>{
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(c, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"])) {
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(this.casing.getColumnCasing(c));
                        }
                        return c;
                    })));
                } else {
                    chunk.push(query);
                }
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased)) {
                    chunk.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` as ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(field.fieldAlias)}`);
                }
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"])) {
                const tableName = field.table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Name];
                if (field.columnType === "SQLiteNumericBigInt") {
                    if (isSingleTable) {
                        chunk.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`cast(${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(this.casing.getColumnCasing(field))} as text)`);
                    } else {
                        chunk.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`cast(${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(tableName)}.${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(this.casing.getColumnCasing(field))} as text)`);
                    }
                } else {
                    if (isSingleTable) {
                        chunk.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(this.casing.getColumnCasing(field)));
                    } else {
                        chunk.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(tableName)}.${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(this.casing.getColumnCasing(field))}`);
                    }
                }
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"])) {
                const entries = Object.entries(field._.selectedFields);
                if (entries.length === 1) {
                    const entry = entries[0][1];
                    const fieldDecoder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(entry, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) ? entry.decoder : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(entry, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"]) ? {
                        mapFromDriverValue: (v)=>entry.mapFromDriverValue(v)
                    } : entry.sql.decoder;
                    if (fieldDecoder) field._.sql.decoder = fieldDecoder;
                }
                chunk.push(field);
            }
            if (i < columnsLen - 1) {
                chunk.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `);
            }
            return chunk;
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(chunks);
    }
    buildJoins(joins) {
        if (!joins || joins.length === 0) {
            return void 0;
        }
        const joinsArray = [];
        if (joins) {
            for (const [index, joinMeta] of joins.entries()){
                if (index === 0) {
                    joinsArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` `);
                }
                const table = joinMeta.table;
                const onSql = joinMeta.on ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` on ${joinMeta.on}` : void 0;
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteTable"])) {
                    const tableName = table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteTable"].Symbol.Name];
                    const tableSchema = table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteTable"].Symbol.Schema];
                    const origTableName = table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteTable"].Symbol.OriginalName];
                    const alias = tableName === origTableName ? void 0 : joinMeta.alias;
                    joinsArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(joinMeta.joinType)} join ${tableSchema ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(tableSchema)}.` : void 0}${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(origTableName)}${alias && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(alias)}`}${onSql}`);
                } else {
                    joinsArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(joinMeta.joinType)} join ${table}${onSql}`);
                }
                if (index < joins.length - 1) {
                    joinsArray.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` `);
                }
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(joinsArray);
    }
    buildLimit(limit) {
        return typeof limit === "object" || typeof limit === "number" && limit >= 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` limit ${limit}` : void 0;
    }
    buildOrderBy(orderBy) {
        const orderByList = [];
        if (orderBy) {
            for (const [index, orderByValue] of orderBy.entries()){
                orderByList.push(orderByValue);
                if (index < orderBy.length - 1) {
                    orderByList.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `);
                }
            }
        }
        return orderByList.length > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` order by ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(orderByList)}` : void 0;
    }
    buildFromTable(table) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"]) && table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.IsAlias]) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Schema] ?? "")}.`.if(table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Schema])}${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.OriginalName])} ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Name])}`;
        }
        return table;
    }
    buildSelectQuery({ withList, fields, fieldsFlat, where, having, table, joins, orderBy, groupBy, limit, offset, distinct, setOperators }) {
        const fieldsList = fieldsFlat ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["orderSelectedFields"])(fields);
        for (const f of fieldsList){
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(f.field, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"]) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableName"])(f.field.table) !== ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"]) ? table._.alias : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$view$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteViewBase"]) ? table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].name : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) ? void 0 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableName"])(table)) && !((table2)=>joins?.some(({ alias })=>alias === (table2[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.IsAlias] ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableName"])(table2) : table2[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.BaseName])))(f.field.table)) {
                const tableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableName"])(f.field.table);
                throw new Error(`Your "${f.path.join("->")}" field references a column "${tableName}"."${f.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`);
            }
        }
        const isSingleTable = !joins || joins.length === 0;
        const withSql = this.buildWithCTE(withList);
        const distinctSql = distinct ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` distinct` : void 0;
        const selection = this.buildSelection(fieldsList, {
            isSingleTable
        });
        const tableSql = this.buildFromTable(table);
        const joinsSql = this.buildJoins(joins);
        const whereSql = where ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` where ${where}` : void 0;
        const havingSql = having ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` having ${having}` : void 0;
        const groupByList = [];
        if (groupBy) {
            for (const [index, groupByValue] of groupBy.entries()){
                groupByList.push(groupByValue);
                if (index < groupBy.length - 1) {
                    groupByList.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `);
                }
            }
        }
        const groupBySql = groupByList.length > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` group by ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(groupByList)}` : void 0;
        const orderBySql = this.buildOrderBy(orderBy);
        const limitSql = this.buildLimit(limit);
        const offsetSql = offset ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` offset ${offset}` : void 0;
        const finalQuery = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}`;
        if (setOperators.length > 0) {
            return this.buildSetOperations(finalQuery, setOperators);
        }
        return finalQuery;
    }
    buildSetOperations(leftSelect, setOperators) {
        const [setOperator, ...rest] = setOperators;
        if (!setOperator) {
            throw new Error("Cannot pass undefined values to any set operator");
        }
        if (rest.length === 0) {
            return this.buildSetOperationQuery({
                leftSelect,
                setOperator
            });
        }
        return this.buildSetOperations(this.buildSetOperationQuery({
            leftSelect,
            setOperator
        }), rest);
    }
    buildSetOperationQuery({ leftSelect, setOperator: { type, isAll, rightSelect, limit, orderBy, offset } }) {
        const leftChunk = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${leftSelect.getSQL()} `;
        const rightChunk = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${rightSelect.getSQL()}`;
        let orderBySql;
        if (orderBy && orderBy.length > 0) {
            const orderByValues = [];
            for (const singleOrderBy of orderBy){
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(singleOrderBy, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumn"])) {
                    orderByValues.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(singleOrderBy.name));
                } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(singleOrderBy, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
                    for(let i = 0; i < singleOrderBy.queryChunks.length; i++){
                        const chunk = singleOrderBy.queryChunks[i];
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(chunk, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumn"])) {
                            singleOrderBy.queryChunks[i] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(this.casing.getColumnCasing(chunk));
                        }
                    }
                    orderByValues.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${singleOrderBy}`);
                } else {
                    orderByValues.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${singleOrderBy}`);
                }
            }
            orderBySql = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` order by ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(orderByValues, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `)}`;
        }
        const limitSql = typeof limit === "object" || typeof limit === "number" && limit >= 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` limit ${limit}` : void 0;
        const operatorChunk = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(`${type} ${isAll ? "all " : ""}`);
        const offsetSql = offset ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` offset ${offset}` : void 0;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${leftChunk}${operatorChunk}${rightChunk}${orderBySql}${limitSql}${offsetSql}`;
    }
    buildInsertQuery({ table, values: valuesOrSelect, onConflict, returning, withList, select }) {
        const valuesSqlList = [];
        const columns = table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns];
        const colEntries = Object.entries(columns).filter(([_, col])=>!col.shouldDisableInsert());
        const insertOrder = colEntries.map(([, column])=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(this.casing.getColumnCasing(column)));
        if (select) {
            const select2 = valuesOrSelect;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(select2, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
                valuesSqlList.push(select2);
            } else {
                valuesSqlList.push(select2.getSQL());
            }
        } else {
            const values = valuesOrSelect;
            valuesSqlList.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw("values "));
            for (const [valueIndex, value] of values.entries()){
                const valueList = [];
                for (const [fieldName, col] of colEntries){
                    const colValue = value[fieldName];
                    if (colValue === void 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(colValue, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Param"]) && colValue.value === void 0) {
                        let defaultValue;
                        if (col.default !== null && col.default !== void 0) {
                            defaultValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(col.default, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) ? col.default : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].param(col.default, col);
                        } else if (col.defaultFn !== void 0) {
                            const defaultFnResult = col.defaultFn();
                            defaultValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(defaultFnResult, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) ? defaultFnResult : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].param(defaultFnResult, col);
                        } else if (!col.default && col.onUpdateFn !== void 0) {
                            const onUpdateFnResult = col.onUpdateFn();
                            defaultValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(onUpdateFnResult, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) ? onUpdateFnResult : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].param(onUpdateFnResult, col);
                        } else {
                            defaultValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`null`;
                        }
                        valueList.push(defaultValue);
                    } else {
                        valueList.push(colValue);
                    }
                }
                valuesSqlList.push(valueList);
                if (valueIndex < values.length - 1) {
                    valuesSqlList.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `);
                }
            }
        }
        const withSql = this.buildWithCTE(withList);
        const valuesSql = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(valuesSqlList);
        const returningSql = returning ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` returning ${this.buildSelection(returning, {
            isSingleTable: true
        })}` : void 0;
        const onConflictSql = onConflict?.length ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(onConflict) : void 0;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${withSql}insert into ${table} ${insertOrder} ${valuesSql}${onConflictSql}${returningSql}`;
    }
    sqlToQuery(sql2, invokeSource) {
        return sql2.toQuery({
            casing: this.casing,
            escapeName: this.escapeName,
            escapeParam: this.escapeParam,
            escapeString: this.escapeString,
            invokeSource
        });
    }
    buildRelationalQuery({ fullSchema, schema, tableNamesMap, table, tableConfig, queryConfig: config, tableAlias, nestedQueryRelation, joinOn }) {
        let selection = [];
        let limit, offset, orderBy = [], where;
        const joins = [];
        if (config === true) {
            const selectionEntries = Object.entries(tableConfig.columns);
            selection = selectionEntries.map(([key, value])=>({
                    dbKey: value.name,
                    tsKey: key,
                    field: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(value, tableAlias),
                    relationTableTsKey: void 0,
                    isJson: false,
                    selection: []
                }));
        } else {
            const aliasedColumns = Object.fromEntries(Object.entries(tableConfig.columns).map(([key, value])=>[
                    key,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(value, tableAlias)
                ]));
            if (config.where) {
                const whereSql = typeof config.where === "function" ? config.where(aliasedColumns, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOperators"])()) : config.where;
                where = whereSql && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapColumnsInSQLToAlias"])(whereSql, tableAlias);
            }
            const fieldsSelection = [];
            let selectedColumns = [];
            if (config.columns) {
                let isIncludeMode = false;
                for (const [field, value] of Object.entries(config.columns)){
                    if (value === void 0) {
                        continue;
                    }
                    if (field in tableConfig.columns) {
                        if (!isIncludeMode && value === true) {
                            isIncludeMode = true;
                        }
                        selectedColumns.push(field);
                    }
                }
                if (selectedColumns.length > 0) {
                    selectedColumns = isIncludeMode ? selectedColumns.filter((c)=>config.columns?.[c] === true) : Object.keys(tableConfig.columns).filter((key)=>!selectedColumns.includes(key));
                }
            } else {
                selectedColumns = Object.keys(tableConfig.columns);
            }
            for (const field of selectedColumns){
                const column = tableConfig.columns[field];
                fieldsSelection.push({
                    tsKey: field,
                    value: column
                });
            }
            let selectedRelations = [];
            if (config.with) {
                selectedRelations = Object.entries(config.with).filter((entry)=>!!entry[1]).map(([tsKey, queryConfig])=>({
                        tsKey,
                        queryConfig,
                        relation: tableConfig.relations[tsKey]
                    }));
            }
            let extras;
            if (config.extras) {
                extras = typeof config.extras === "function" ? config.extras(aliasedColumns, {
                    sql: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]
                }) : config.extras;
                for (const [tsKey, value] of Object.entries(extras)){
                    fieldsSelection.push({
                        tsKey,
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapColumnsInAliasedSQLToAlias"])(value, tableAlias)
                    });
                }
            }
            for (const { tsKey, value } of fieldsSelection){
                selection.push({
                    dbKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
                    tsKey,
                    field: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"]) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(value, tableAlias) : value,
                    relationTableTsKey: void 0,
                    isJson: false,
                    selection: []
                });
            }
            let orderByOrig = typeof config.orderBy === "function" ? config.orderBy(aliasedColumns, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrderByOperators"])()) : config.orderBy ?? [];
            if (!Array.isArray(orderByOrig)) {
                orderByOrig = [
                    orderByOrig
                ];
            }
            orderBy = orderByOrig.map((orderByValue)=>{
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(orderByValue, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"])) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(orderByValue, tableAlias);
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapColumnsInSQLToAlias"])(orderByValue, tableAlias);
            });
            limit = config.limit;
            offset = config.offset;
            for (const { tsKey: selectedRelationTsKey, queryConfig: selectedRelationConfigValue, relation } of selectedRelations){
                const normalizedRelation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeRelation"])(schema, tableNamesMap, relation);
                const relationTableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableUniqueName"])(relation.referencedTable);
                const relationTableTsName = tableNamesMap[relationTableName];
                const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
                const joinOn2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["and"])(...normalizedRelation.fields.map((field2, i)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eq"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(normalizedRelation.references[i], relationTableAlias), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(field2, tableAlias))));
                const builtRelation = this.buildRelationalQuery({
                    fullSchema,
                    schema,
                    tableNamesMap,
                    table: fullSchema[relationTableTsName],
                    tableConfig: schema[relationTableTsName],
                    queryConfig: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(relation, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["One"]) ? selectedRelationConfigValue === true ? {
                        limit: 1
                    } : {
                        ...selectedRelationConfigValue,
                        limit: 1
                    } : selectedRelationConfigValue,
                    tableAlias: relationTableAlias,
                    joinOn: joinOn2,
                    nestedQueryRelation: relation
                });
                const field = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`(${builtRelation.sql})`.as(selectedRelationTsKey);
                selection.push({
                    dbKey: selectedRelationTsKey,
                    tsKey: selectedRelationTsKey,
                    field,
                    relationTableTsKey: relationTableTsName,
                    isJson: true,
                    selection: builtRelation.selection
                });
            }
        }
        if (selection.length === 0) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DrizzleError"]({
                message: `No fields selected for table "${tableConfig.tsName}" ("${tableAlias}"). You need to have at least one item in "columns", "with" or "extras". If you need to select all columns, omit the "columns" key or set it to undefined.`
            });
        }
        let result;
        where = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["and"])(joinOn, where);
        if (nestedQueryRelation) {
            let field = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`json_array(${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].join(selection.map(({ field: field2 })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field2, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$columns$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteColumn"]) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(this.casing.getColumnCasing(field2)) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field2, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"].Aliased) ? field2.sql : field2), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`, `)})`;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(nestedQueryRelation, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Many"])) {
                field = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`coalesce(json_group_array(${field}), json_array())`;
            }
            const nestedSelection = [
                {
                    dbKey: "data",
                    tsKey: "data",
                    field: field.as("data"),
                    isJson: true,
                    relationTableTsKey: tableConfig.tsName,
                    selection
                }
            ];
            const needsSubquery = limit !== void 0 || offset !== void 0 || orderBy.length > 0;
            if (needsSubquery) {
                result = this.buildSelectQuery({
                    table: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTable"])(table, tableAlias),
                    fields: {},
                    fieldsFlat: [
                        {
                            path: [],
                            field: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw("*")
                        }
                    ],
                    where,
                    limit,
                    offset,
                    orderBy,
                    setOperators: []
                });
                where = void 0;
                limit = void 0;
                offset = void 0;
                orderBy = void 0;
            } else {
                result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTable"])(table, tableAlias);
            }
            result = this.buildSelectQuery({
                table: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(result, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteTable"]) ? result : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"](result, {}, tableAlias),
                fields: {},
                fieldsFlat: nestedSelection.map(({ field: field2 })=>({
                        path: [],
                        field: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field2, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"]) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(field2, tableAlias) : field2
                    })),
                joins,
                where,
                limit,
                offset,
                orderBy,
                setOperators: []
            });
        } else {
            result = this.buildSelectQuery({
                table: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTable"])(table, tableAlias),
                fields: {},
                fieldsFlat: selection.map(({ field })=>({
                        path: [],
                        field: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(field, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$column$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Column"]) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$alias$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aliasedTableColumn"])(field, tableAlias) : field
                    })),
                joins,
                where,
                limit,
                offset,
                orderBy,
                setOperators: []
            });
        }
        return {
            tableTsKey: tableConfig.tsName,
            sql: result,
            selection
        };
    }
}
class SQLiteSyncDialect extends SQLiteDialect {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteSyncDialect";
    migrate(migrations, session, config) {
        const migrationsTable = config === void 0 ? "__drizzle_migrations" : typeof config === "string" ? "__drizzle_migrations" : config.migrationsTable ?? "__drizzle_migrations";
        const migrationTableCreate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`
			CREATE TABLE IF NOT EXISTS ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
        session.run(migrationTableCreate);
        const dbMigrations = session.values(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`SELECT id, hash, created_at FROM ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(migrationsTable)} ORDER BY created_at DESC LIMIT 1`);
        const lastDbMigration = dbMigrations[0] ?? void 0;
        session.run(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`BEGIN`);
        try {
            for (const migration of migrations){
                if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
                    for (const stmt of migration.sql){
                        session.run(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(stmt));
                    }
                    session.run(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`INSERT INTO ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(migrationsTable)} ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`);
                }
            }
            session.run(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`COMMIT`);
        } catch (e) {
            session.run(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`ROLLBACK`);
            throw e;
        }
    }
}
class SQLiteAsyncDialect extends SQLiteDialect {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteAsyncDialect";
    async migrate(migrations, session, config) {
        const migrationsTable = config === void 0 ? "__drizzle_migrations" : typeof config === "string" ? "__drizzle_migrations" : config.migrationsTable ?? "__drizzle_migrations";
        const migrationTableCreate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`
			CREATE TABLE IF NOT EXISTS ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
        await session.run(migrationTableCreate);
        const dbMigrations = await session.values(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`SELECT id, hash, created_at FROM ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(migrationsTable)} ORDER BY created_at DESC LIMIT 1`);
        const lastDbMigration = dbMigrations[0] ?? void 0;
        await session.transaction(async (tx)=>{
            for (const migration of migrations){
                if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
                    for (const stmt of migration.sql){
                        await tx.run(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(stmt));
                    }
                    await tx.run(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`INSERT INTO ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].identifier(migrationsTable)} ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`);
                }
            }
        });
    }
}
;
 //# sourceMappingURL=dialect.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/checks.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Check",
    ()=>Check,
    "CheckBuilder",
    ()=>CheckBuilder,
    "check",
    ()=>check
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
;
class CheckBuilder {
    constructor(name, value){
        this.name = name;
        this.value = value;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteCheckBuilder";
    brand;
    build(table) {
        return new Check(table, this);
    }
}
class Check {
    constructor(table, builder){
        this.table = table;
        this.name = builder.name;
        this.value = builder.value;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteCheck";
    name;
    value;
}
function check(name, value) {
    return new CheckBuilder(name, value);
}
;
 //# sourceMappingURL=checks.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/indexes.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Index",
    ()=>Index,
    "IndexBuilder",
    ()=>IndexBuilder,
    "IndexBuilderOn",
    ()=>IndexBuilderOn,
    "index",
    ()=>index,
    "uniqueIndex",
    ()=>uniqueIndex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
;
class IndexBuilderOn {
    constructor(name, unique){
        this.name = name;
        this.unique = unique;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteIndexBuilderOn";
    on(...columns) {
        return new IndexBuilder(this.name, columns, this.unique);
    }
}
class IndexBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteIndexBuilder";
    /** @internal */ config;
    constructor(name, columns, unique){
        this.config = {
            name,
            columns,
            unique,
            where: void 0
        };
    }
    /**
   * Condition for partial index.
   */ where(condition) {
        this.config.where = condition;
        return this;
    }
    /** @internal */ build(table) {
        return new Index(this.config, table);
    }
}
class Index {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteIndex";
    config;
    constructor(config, table){
        this.config = {
            ...config,
            table
        };
    }
}
function index(name) {
    return new IndexBuilderOn(name, false);
}
function uniqueIndex(name) {
    return new IndexBuilderOn(name, true);
}
;
 //# sourceMappingURL=indexes.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/primary-keys.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PrimaryKey",
    ()=>PrimaryKey,
    "PrimaryKeyBuilder",
    ()=>PrimaryKeyBuilder,
    "primaryKey",
    ()=>primaryKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/table.js [app-rsc] (ecmascript)");
;
;
function primaryKey(...config) {
    if (config[0].columns) {
        return new PrimaryKeyBuilder(config[0].columns, config[0].name);
    }
    return new PrimaryKeyBuilder(config);
}
class PrimaryKeyBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLitePrimaryKeyBuilder";
    /** @internal */ columns;
    /** @internal */ name;
    constructor(columns, name){
        this.columns = columns;
        this.name = name;
    }
    /** @internal */ build(table) {
        return new PrimaryKey(table, this.columns, this.name);
    }
}
class PrimaryKey {
    constructor(table, columns, name){
        this.table = table;
        this.columns = columns;
        this.name = name;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLitePrimaryKey";
    columns;
    name;
    getName() {
        return this.name ?? `${this.table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteTable"].Symbol.Name]}_${this.columns.map((column)=>column.name).join("_")}_pk`;
    }
}
;
 //# sourceMappingURL=primary-keys.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractUsedTable",
    ()=>extractUsedTable,
    "getTableConfig",
    ()=>getTableConfig,
    "getViewConfig",
    ()=>getViewConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/subquery.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/view-common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$checks$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/checks.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$foreign$2d$keys$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/foreign-keys.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/indexes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$primary$2d$keys$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/primary-keys.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$unique$2d$constraint$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/unique-constraint.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
function getTableConfig(table) {
    const columns = Object.values(table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteTable"].Symbol.Columns]);
    const indexes = [];
    const checks = [];
    const primaryKeys = [];
    const uniqueConstraints = [];
    const foreignKeys = Object.values(table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteTable"].Symbol.InlineForeignKeys]);
    const name = table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Name];
    const extraConfigBuilder = table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteTable"].Symbol.ExtraConfigBuilder];
    if (extraConfigBuilder !== void 0) {
        const extraConfig = extraConfigBuilder(table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteTable"].Symbol.Columns]);
        const extraValues = Array.isArray(extraConfig) ? extraConfig.flat(1) : Object.values(extraConfig);
        for (const builder of Object.values(extraValues)){
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(builder, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$indexes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["IndexBuilder"])) {
                indexes.push(builder.build(table));
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(builder, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$checks$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CheckBuilder"])) {
                checks.push(builder.build(table));
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(builder, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$unique$2d$constraint$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UniqueConstraintBuilder"])) {
                uniqueConstraints.push(builder.build(table));
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(builder, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$primary$2d$keys$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PrimaryKeyBuilder"])) {
                primaryKeys.push(builder.build(table));
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(builder, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$foreign$2d$keys$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ForeignKeyBuilder"])) {
                foreignKeys.push(builder.build(table));
            }
        }
    }
    return {
        columns,
        indexes,
        foreignKeys,
        checks,
        primaryKeys,
        uniqueConstraints,
        name
    };
}
function extractUsedTable(table) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteTable"])) {
        return [
            `${table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.BaseName]}`
        ];
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"])) {
        return table._.usedTables ?? [];
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
        return table.usedTables ?? [];
    }
    return [];
}
function getViewConfig(view) {
    return {
        ...view[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]]
    };
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/select.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SQLiteSelectBase",
    ()=>SQLiteSelectBase,
    "SQLiteSelectBuilder",
    ()=>SQLiteSelectBuilder,
    "SQLiteSelectQueryBuilderBase",
    ()=>SQLiteSelectQueryBuilderBase,
    "except",
    ()=>except,
    "intersect",
    ()=>intersect,
    "union",
    ()=>union,
    "unionAll",
    ()=>unionAll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$builders$2f$query$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/query-builders/query-builder.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/query-promise.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/selection-proxy.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/subquery.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/view-common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$view$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/view-base.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
class SQLiteSelectBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteSelectBuilder";
    fields;
    session;
    dialect;
    withList;
    distinct;
    constructor(config){
        this.fields = config.fields;
        this.session = config.session;
        this.dialect = config.dialect;
        this.withList = config.withList;
        this.distinct = config.distinct;
    }
    from(source) {
        const isPartialSelect = !!this.fields;
        let fields;
        if (this.fields) {
            fields = this.fields;
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(source, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"])) {
            fields = Object.fromEntries(Object.keys(source._.selectedFields).map((key)=>[
                    key,
                    source[key]
                ]));
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(source, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$view$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteViewBase"])) {
            fields = source[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].selectedFields;
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(source, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
            fields = {};
        } else {
            fields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableColumns"])(source);
        }
        return new SQLiteSelectBase({
            table: source,
            fields,
            isPartialSelect,
            session: this.session,
            dialect: this.dialect,
            withList: this.withList,
            distinct: this.distinct
        });
    }
}
class SQLiteSelectQueryBuilderBase extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$builders$2f$query$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TypedQueryBuilder"] {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteSelectQueryBuilder";
    _;
    /** @internal */ config;
    joinsNotNullableMap;
    tableName;
    isPartialSelect;
    session;
    dialect;
    cacheConfig = void 0;
    usedTables = /* @__PURE__ */ new Set();
    constructor({ table, fields, isPartialSelect, session, dialect, withList, distinct }){
        super();
        this.config = {
            withList,
            table,
            fields: {
                ...fields
            },
            distinct,
            setOperators: []
        };
        this.isPartialSelect = isPartialSelect;
        this.session = session;
        this.dialect = dialect;
        this._ = {
            selectedFields: fields,
            config: this.config
        };
        this.tableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableLikeName"])(table);
        this.joinsNotNullableMap = typeof this.tableName === "string" ? {
            [this.tableName]: true
        } : {};
        for (const item of (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["extractUsedTable"])(table))this.usedTables.add(item);
    }
    /** @internal */ getUsedTables() {
        return [
            ...this.usedTables
        ];
    }
    createJoin(joinType) {
        return (table, on)=>{
            const baseTableName = this.tableName;
            const tableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableLikeName"])(table);
            for (const item of (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["extractUsedTable"])(table))this.usedTables.add(item);
            if (typeof tableName === "string" && this.config.joins?.some((join)=>join.alias === tableName)) {
                throw new Error(`Alias "${tableName}" is already used in this query`);
            }
            if (!this.isPartialSelect) {
                if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
                    this.config.fields = {
                        [baseTableName]: this.config.fields
                    };
                }
                if (typeof tableName === "string" && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"])) {
                    const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"]) ? table._.selectedFields : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["View"]) ? table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].selectedFields : table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns];
                    this.config.fields[tableName] = selection;
                }
            }
            if (typeof on === "function") {
                on = on(new Proxy(this.config.fields, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                    sqlAliasedBehavior: "sql",
                    sqlBehavior: "sql"
                })));
            }
            if (!this.config.joins) {
                this.config.joins = [];
            }
            this.config.joins.push({
                on,
                table,
                joinType,
                alias: tableName
            });
            if (typeof tableName === "string") {
                switch(joinType){
                    case "left":
                        {
                            this.joinsNotNullableMap[tableName] = false;
                            break;
                        }
                    case "right":
                        {
                            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key])=>[
                                    key,
                                    false
                                ]));
                            this.joinsNotNullableMap[tableName] = true;
                            break;
                        }
                    case "cross":
                    case "inner":
                        {
                            this.joinsNotNullableMap[tableName] = true;
                            break;
                        }
                    case "full":
                        {
                            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key])=>[
                                    key,
                                    false
                                ]));
                            this.joinsNotNullableMap[tableName] = false;
                            break;
                        }
                }
            }
            return this;
        };
    }
    /**
   * Executes a `left join` operation by adding another table to the current query.
   *
   * Calling this method associates each row of the table with the corresponding row from the joined table, if a match is found. If no matching row exists, it sets all columns of the joined table to null.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#left-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User; pets: Pet | null; }[] = await db.select()
   *   .from(users)
   *   .leftJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number; petId: number | null; }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .leftJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */ leftJoin = this.createJoin("left");
    /**
   * Executes a `right join` operation by adding another table to the current query.
   *
   * Calling this method associates each row of the joined table with the corresponding row from the main table, if a match is found. If no matching row exists, it sets all columns of the main table to null.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#right-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User | null; pets: Pet; }[] = await db.select()
   *   .from(users)
   *   .rightJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number | null; petId: number; }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .rightJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */ rightJoin = this.createJoin("right");
    /**
   * Executes an `inner join` operation, creating a new table by combining rows from two tables that have matching values.
   *
   * Calling this method retrieves rows that have corresponding entries in both joined tables. Rows without matching entries in either table are excluded, resulting in a table that includes only matching pairs.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#inner-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
   *   .from(users)
   *   .innerJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .innerJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */ innerJoin = this.createJoin("inner");
    /**
   * Executes a `full join` operation by combining rows from two tables into a new table.
   *
   * Calling this method retrieves all rows from both main and joined tables, merging rows with matching values and filling in `null` for non-matching columns.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#full-join}
   *
   * @param table the table to join.
   * @param on the `on` clause.
   *
   * @example
   *
   * ```ts
   * // Select all users and their pets
   * const usersWithPets: { user: User | null; pets: Pet | null; }[] = await db.select()
   *   .from(users)
   *   .fullJoin(pets, eq(users.id, pets.ownerId))
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number | null; petId: number | null; }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .fullJoin(pets, eq(users.id, pets.ownerId))
   * ```
   */ fullJoin = this.createJoin("full");
    /**
   * Executes a `cross join` operation by combining rows from two tables into a new table.
   *
   * Calling this method retrieves all rows from both main and joined tables, merging all rows from each table.
   *
   * See docs: {@link https://orm.drizzle.team/docs/joins#cross-join}
   *
   * @param table the table to join.
   *
   * @example
   *
   * ```ts
   * // Select all users, each user with every pet
   * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
   *   .from(users)
   *   .crossJoin(pets)
   *
   * // Select userId and petId
   * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
   *   userId: users.id,
   *   petId: pets.id,
   * })
   *   .from(users)
   *   .crossJoin(pets)
   * ```
   */ crossJoin = this.createJoin("cross");
    createSetOperator(type, isAll) {
        return (rightSelection)=>{
            const rightSelect = typeof rightSelection === "function" ? rightSelection(getSQLiteSetOperators()) : rightSelection;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["haveSameKeys"])(this.getSelectedFields(), rightSelect.getSelectedFields())) {
                throw new Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
            }
            this.config.setOperators.push({
                type,
                isAll,
                rightSelect
            });
            return this;
        };
    }
    /**
   * Adds `union` set operator to the query.
   *
   * Calling this method will combine the result sets of the `select` statements and remove any duplicate rows that appear across them.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#union}
   *
   * @example
   *
   * ```ts
   * // Select all unique names from customers and users tables
   * await db.select({ name: users.name })
   *   .from(users)
   *   .union(
   *     db.select({ name: customers.name }).from(customers)
   *   );
   * // or
   * import { union } from 'drizzle-orm/sqlite-core'
   *
   * await union(
   *   db.select({ name: users.name }).from(users),
   *   db.select({ name: customers.name }).from(customers)
   * );
   * ```
   */ union = this.createSetOperator("union", false);
    /**
   * Adds `union all` set operator to the query.
   *
   * Calling this method will combine the result-set of the `select` statements and keep all duplicate rows that appear across them.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#union-all}
   *
   * @example
   *
   * ```ts
   * // Select all transaction ids from both online and in-store sales
   * await db.select({ transaction: onlineSales.transactionId })
   *   .from(onlineSales)
   *   .unionAll(
   *     db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
   *   );
   * // or
   * import { unionAll } from 'drizzle-orm/sqlite-core'
   *
   * await unionAll(
   *   db.select({ transaction: onlineSales.transactionId }).from(onlineSales),
   *   db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
   * );
   * ```
   */ unionAll = this.createSetOperator("union", true);
    /**
   * Adds `intersect` set operator to the query.
   *
   * Calling this method will retain only the rows that are present in both result sets and eliminate duplicates.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#intersect}
   *
   * @example
   *
   * ```ts
   * // Select course names that are offered in both departments A and B
   * await db.select({ courseName: depA.courseName })
   *   .from(depA)
   *   .intersect(
   *     db.select({ courseName: depB.courseName }).from(depB)
   *   );
   * // or
   * import { intersect } from 'drizzle-orm/sqlite-core'
   *
   * await intersect(
   *   db.select({ courseName: depA.courseName }).from(depA),
   *   db.select({ courseName: depB.courseName }).from(depB)
   * );
   * ```
   */ intersect = this.createSetOperator("intersect", false);
    /**
   * Adds `except` set operator to the query.
   *
   * Calling this method will retrieve all unique rows from the left query, except for the rows that are present in the result set of the right query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/set-operations#except}
   *
   * @example
   *
   * ```ts
   * // Select all courses offered in department A but not in department B
   * await db.select({ courseName: depA.courseName })
   *   .from(depA)
   *   .except(
   *     db.select({ courseName: depB.courseName }).from(depB)
   *   );
   * // or
   * import { except } from 'drizzle-orm/sqlite-core'
   *
   * await except(
   *   db.select({ courseName: depA.courseName }).from(depA),
   *   db.select({ courseName: depB.courseName }).from(depB)
   * );
   * ```
   */ except = this.createSetOperator("except", false);
    /** @internal */ addSetOperators(setOperators) {
        this.config.setOperators.push(...setOperators);
        return this;
    }
    /**
   * Adds a `where` clause to the query.
   *
   * Calling this method will select only those rows that fulfill a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#filtering}
   *
   * @param where the `where` clause.
   *
   * @example
   * You can use conditional operators and `sql function` to filter the rows to be selected.
   *
   * ```ts
   * // Select all cars with green color
   * await db.select().from(cars).where(eq(cars.color, 'green'));
   * // or
   * await db.select().from(cars).where(sql`${cars.color} = 'green'`)
   * ```
   *
   * You can logically combine conditional operators with `and()` and `or()` operators:
   *
   * ```ts
   * // Select all BMW cars with a green color
   * await db.select().from(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
   *
   * // Select all cars with the green or blue color
   * await db.select().from(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
   * ```
   */ where(where) {
        if (typeof where === "function") {
            where = where(new Proxy(this.config.fields, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                sqlAliasedBehavior: "sql",
                sqlBehavior: "sql"
            })));
        }
        this.config.where = where;
        return this;
    }
    /**
   * Adds a `having` clause to the query.
   *
   * Calling this method will select only those rows that fulfill a specified condition. It is typically used with aggregate functions to filter the aggregated data based on a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#aggregations}
   *
   * @param having the `having` clause.
   *
   * @example
   *
   * ```ts
   * // Select all brands with more than one car
   * await db.select({
   * 	brand: cars.brand,
   * 	count: sql<number>`cast(count(${cars.id}) as int)`,
   * })
   *   .from(cars)
   *   .groupBy(cars.brand)
   *   .having(({ count }) => gt(count, 1));
   * ```
   */ having(having) {
        if (typeof having === "function") {
            having = having(new Proxy(this.config.fields, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                sqlAliasedBehavior: "sql",
                sqlBehavior: "sql"
            })));
        }
        this.config.having = having;
        return this;
    }
    groupBy(...columns) {
        if (typeof columns[0] === "function") {
            const groupBy = columns[0](new Proxy(this.config.fields, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                sqlAliasedBehavior: "alias",
                sqlBehavior: "sql"
            })));
            this.config.groupBy = Array.isArray(groupBy) ? groupBy : [
                groupBy
            ];
        } else {
            this.config.groupBy = columns;
        }
        return this;
    }
    orderBy(...columns) {
        if (typeof columns[0] === "function") {
            const orderBy = columns[0](new Proxy(this.config.fields, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                sqlAliasedBehavior: "alias",
                sqlBehavior: "sql"
            })));
            const orderByArray = Array.isArray(orderBy) ? orderBy : [
                orderBy
            ];
            if (this.config.setOperators.length > 0) {
                this.config.setOperators.at(-1).orderBy = orderByArray;
            } else {
                this.config.orderBy = orderByArray;
            }
        } else {
            const orderByArray = columns;
            if (this.config.setOperators.length > 0) {
                this.config.setOperators.at(-1).orderBy = orderByArray;
            } else {
                this.config.orderBy = orderByArray;
            }
        }
        return this;
    }
    /**
   * Adds a `limit` clause to the query.
   *
   * Calling this method will set the maximum number of rows that will be returned by this query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
   *
   * @param limit the `limit` clause.
   *
   * @example
   *
   * ```ts
   * // Get the first 10 people from this query.
   * await db.select().from(people).limit(10);
   * ```
   */ limit(limit) {
        if (this.config.setOperators.length > 0) {
            this.config.setOperators.at(-1).limit = limit;
        } else {
            this.config.limit = limit;
        }
        return this;
    }
    /**
   * Adds an `offset` clause to the query.
   *
   * Calling this method will skip a number of rows when returning results from this query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
   *
   * @param offset the `offset` clause.
   *
   * @example
   *
   * ```ts
   * // Get the 10th-20th people from this query.
   * await db.select().from(people).offset(10).limit(10);
   * ```
   */ offset(offset) {
        if (this.config.setOperators.length > 0) {
            this.config.setOperators.at(-1).offset = offset;
        } else {
            this.config.offset = offset;
        }
        return this;
    }
    /** @internal */ getSQL() {
        return this.dialect.buildSelectQuery(this.config);
    }
    toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
    }
    as(alias) {
        const usedTables = [];
        usedTables.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["extractUsedTable"])(this.config.table));
        if (this.config.joins) {
            for (const it of this.config.joins)usedTables.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["extractUsedTable"])(it.table));
        }
        return new Proxy(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"](this.getSQL(), this.config.fields, alias, false, [
            ...new Set(usedTables)
        ]), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
            alias,
            sqlAliasedBehavior: "alias",
            sqlBehavior: "error"
        }));
    }
    /** @internal */ getSelectedFields() {
        return new Proxy(this.config.fields, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
            alias: this.tableName,
            sqlAliasedBehavior: "alias",
            sqlBehavior: "error"
        }));
    }
    $dynamic() {
        return this;
    }
}
class SQLiteSelectBase extends SQLiteSelectQueryBuilderBase {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteSelect";
    /** @internal */ _prepare(isOneTimeQuery = true) {
        if (!this.session) {
            throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
        }
        const fieldsList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["orderSelectedFields"])(this.config.fields);
        const query = this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), fieldsList, "all", true, void 0, {
            type: "select",
            tables: [
                ...this.usedTables
            ]
        }, this.cacheConfig);
        query.joinsNotNullableMap = this.joinsNotNullableMap;
        return query;
    }
    $withCache(config) {
        this.cacheConfig = config === void 0 ? {
            config: {},
            enable: true,
            autoInvalidate: true
        } : config === false ? {
            enable: false
        } : {
            enable: true,
            autoInvalidate: true,
            ...config
        };
        return this;
    }
    prepare() {
        return this._prepare(false);
    }
    run = (placeholderValues)=>{
        return this._prepare().run(placeholderValues);
    };
    all = (placeholderValues)=>{
        return this._prepare().all(placeholderValues);
    };
    get = (placeholderValues)=>{
        return this._prepare().get(placeholderValues);
    };
    values = (placeholderValues)=>{
        return this._prepare().values(placeholderValues);
    };
    async execute() {
        return this.all();
    }
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["applyMixins"])(SQLiteSelectBase, [
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryPromise"]
]);
function createSetOperator(type, isAll) {
    return (leftSelect, rightSelect, ...restSelects)=>{
        const setOperators = [
            rightSelect,
            ...restSelects
        ].map((select)=>({
                type,
                isAll,
                rightSelect: select
            }));
        for (const setOperator of setOperators){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["haveSameKeys"])(leftSelect.getSelectedFields(), setOperator.rightSelect.getSelectedFields())) {
                throw new Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
            }
        }
        return leftSelect.addSetOperators(setOperators);
    };
}
const getSQLiteSetOperators = ()=>({
        union,
        unionAll,
        intersect,
        except
    });
const union = createSetOperator("union", false);
const unionAll = createSetOperator("union", true);
const intersect = createSetOperator("intersect", false);
const except = createSetOperator("except", false);
;
 //# sourceMappingURL=select.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/query-builder.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryBuilder",
    ()=>QueryBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/selection-proxy.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/dialect.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/subquery.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/select.js [app-rsc] (ecmascript)");
;
;
;
;
;
class QueryBuilder {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteQueryBuilder";
    dialect;
    dialectConfig;
    constructor(dialect){
        this.dialect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(dialect, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteDialect"]) ? dialect : void 0;
        this.dialectConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(dialect, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteDialect"]) ? void 0 : dialect;
    }
    $with = (alias, selection)=>{
        const queryBuilder = this;
        const as = (qb)=>{
            if (typeof qb === "function") {
                qb = qb(queryBuilder);
            }
            return new Proxy(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WithSubquery"](qb.getSQL(), selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}), alias, true), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                alias,
                sqlAliasedBehavior: "alias",
                sqlBehavior: "error"
            }));
        };
        return {
            as
        };
    };
    with(...queries) {
        const self = this;
        function select(fields) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteSelectBuilder"]({
                fields: fields ?? void 0,
                session: void 0,
                dialect: self.getDialect(),
                withList: queries
            });
        }
        function selectDistinct(fields) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteSelectBuilder"]({
                fields: fields ?? void 0,
                session: void 0,
                dialect: self.getDialect(),
                withList: queries,
                distinct: true
            });
        }
        return {
            select,
            selectDistinct
        };
    }
    select(fields) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteSelectBuilder"]({
            fields: fields ?? void 0,
            session: void 0,
            dialect: this.getDialect()
        });
    }
    selectDistinct(fields) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteSelectBuilder"]({
            fields: fields ?? void 0,
            session: void 0,
            dialect: this.getDialect(),
            distinct: true
        });
    }
    // Lazy load dialect to avoid circular dependency
    getDialect() {
        if (!this.dialect) {
            this.dialect = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$dialect$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteSyncDialect"](this.dialectConfig);
        }
        return this.dialect;
    }
}
;
 //# sourceMappingURL=query-builder.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/delete.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SQLiteDeleteBase",
    ()=>SQLiteDeleteBase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/query-promise.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/selection-proxy.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/utils.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
class SQLiteDeleteBase extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryPromise"] {
    constructor(table, session, dialect, withList){
        super();
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.config = {
            table,
            withList
        };
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteDelete";
    /** @internal */ config;
    /**
   * Adds a `where` clause to the query.
   *
   * Calling this method will delete only those rows that fulfill a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/delete}
   *
   * @param where the `where` clause.
   *
   * @example
   * You can use conditional operators and `sql function` to filter the rows to be deleted.
   *
   * ```ts
   * // Delete all cars with green color
   * db.delete(cars).where(eq(cars.color, 'green'));
   * // or
   * db.delete(cars).where(sql`${cars.color} = 'green'`)
   * ```
   *
   * You can logically combine conditional operators with `and()` and `or()` operators:
   *
   * ```ts
   * // Delete all BMW cars with a green color
   * db.delete(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
   *
   * // Delete all cars with the green or blue color
   * db.delete(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
   * ```
   */ where(where) {
        this.config.where = where;
        return this;
    }
    orderBy(...columns) {
        if (typeof columns[0] === "function") {
            const orderBy = columns[0](new Proxy(this.config.table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns], new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                sqlAliasedBehavior: "alias",
                sqlBehavior: "sql"
            })));
            const orderByArray = Array.isArray(orderBy) ? orderBy : [
                orderBy
            ];
            this.config.orderBy = orderByArray;
        } else {
            const orderByArray = columns;
            this.config.orderBy = orderByArray;
        }
        return this;
    }
    limit(limit) {
        this.config.limit = limit;
        return this;
    }
    returning(fields = this.table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteTable"].Symbol.Columns]) {
        this.config.returning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["orderSelectedFields"])(fields);
        return this;
    }
    /** @internal */ getSQL() {
        return this.dialect.buildDeleteQuery(this.config);
    }
    toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
    }
    /** @internal */ _prepare(isOneTimeQuery = true) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true, void 0, {
            type: "delete",
            tables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["extractUsedTable"])(this.config.table)
        });
    }
    prepare() {
        return this._prepare(false);
    }
    run = (placeholderValues)=>{
        return this._prepare().run(placeholderValues);
    };
    all = (placeholderValues)=>{
        return this._prepare().all(placeholderValues);
    };
    get = (placeholderValues)=>{
        return this._prepare().get(placeholderValues);
    };
    values = (placeholderValues)=>{
        return this._prepare().values(placeholderValues);
    };
    async execute(placeholderValues) {
        return this._prepare().execute(placeholderValues);
    }
    $dynamic() {
        return this;
    }
}
;
 //# sourceMappingURL=delete.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/insert.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SQLiteInsertBase",
    ()=>SQLiteInsertBase,
    "SQLiteInsertBuilder",
    ()=>SQLiteInsertBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/query-promise.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$query$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/query-builder.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
class SQLiteInsertBuilder {
    constructor(table, session, dialect, withList){
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.withList = withList;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteInsertBuilder";
    values(values) {
        values = Array.isArray(values) ? values : [
            values
        ];
        if (values.length === 0) {
            throw new Error("values() must be called with at least one value");
        }
        const mappedValues = values.map((entry)=>{
            const result = {};
            const cols = this.table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns];
            for (const colKey of Object.keys(entry)){
                const colValue = entry[colKey];
                result[colKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(colValue, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) ? colValue : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Param"](colValue, cols[colKey]);
            }
            return result;
        });
        return new SQLiteInsertBase(this.table, mappedValues, this.session, this.dialect, this.withList);
    }
    select(selectQuery) {
        const select = typeof selectQuery === "function" ? selectQuery(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$query$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryBuilder"]()) : selectQuery;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(select, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"]) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["haveSameKeys"])(this.table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Columns"]], select._.selectedFields)) {
            throw new Error("Insert select error: selected fields are not the same or are in a different order compared to the table definition");
        }
        return new SQLiteInsertBase(this.table, select, this.session, this.dialect, this.withList, true);
    }
}
class SQLiteInsertBase extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryPromise"] {
    constructor(table, values, session, dialect, withList, select){
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = {
            table,
            values,
            withList,
            select
        };
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteInsert";
    /** @internal */ config;
    returning(fields = this.config.table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteTable"].Symbol.Columns]) {
        this.config.returning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["orderSelectedFields"])(fields);
        return this;
    }
    /**
   * Adds an `on conflict do nothing` clause to the query.
   *
   * Calling this method simply avoids inserting a row as its alternative action.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert#on-conflict-do-nothing}
   *
   * @param config The `target` and `where` clauses.
   *
   * @example
   * ```ts
   * // Insert one row and cancel the insert if there's a conflict
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoNothing();
   *
   * // Explicitly specify conflict target
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoNothing({ target: cars.id });
   * ```
   */ onConflictDoNothing(config = {}) {
        if (!this.config.onConflict) this.config.onConflict = [];
        if (config.target === void 0) {
            this.config.onConflict.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` on conflict do nothing`);
        } else {
            const targetSql = Array.isArray(config.target) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${config.target}` : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${[
                config.target
            ]}`;
            const whereSql = config.where ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` where ${config.where}` : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]``;
            this.config.onConflict.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` on conflict ${targetSql} do nothing${whereSql}`);
        }
        return this;
    }
    /**
   * Adds an `on conflict do update` clause to the query.
   *
   * Calling this method will update the existing row that conflicts with the row proposed for insertion as its alternative action.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert#upserts-and-conflicts}
   *
   * @param config The `target`, `set` and `where` clauses.
   *
   * @example
   * ```ts
   * // Update the row if there's a conflict
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoUpdate({
   *     target: cars.id,
   *     set: { brand: 'Porsche' }
   *   });
   *
   * // Upsert with 'where' clause
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoUpdate({
   *     target: cars.id,
   *     set: { brand: 'newBMW' },
   *     where: sql`${cars.createdAt} > '2023-01-01'::date`,
   *   });
   * ```
   */ onConflictDoUpdate(config) {
        if (config.where && (config.targetWhere || config.setWhere)) {
            throw new Error('You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.');
        }
        if (!this.config.onConflict) this.config.onConflict = [];
        const whereSql = config.where ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` where ${config.where}` : void 0;
        const targetWhereSql = config.targetWhere ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` where ${config.targetWhere}` : void 0;
        const setWhereSql = config.setWhere ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` where ${config.setWhere}` : void 0;
        const targetSql = Array.isArray(config.target) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${config.target}` : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`${[
            config.target
        ]}`;
        const setSql = this.dialect.buildUpdateSet(this.config.table, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapUpdateSet"])(this.config.table, config.set));
        this.config.onConflict.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]` on conflict ${targetSql}${targetWhereSql} do update set ${setSql}${whereSql}${setWhereSql}`);
        return this;
    }
    /** @internal */ getSQL() {
        return this.dialect.buildInsertQuery(this.config);
    }
    toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
    }
    /** @internal */ _prepare(isOneTimeQuery = true) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true, void 0, {
            type: "insert",
            tables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["extractUsedTable"])(this.config.table)
        });
    }
    prepare() {
        return this._prepare(false);
    }
    run = (placeholderValues)=>{
        return this._prepare().run(placeholderValues);
    };
    all = (placeholderValues)=>{
        return this._prepare().all(placeholderValues);
    };
    get = (placeholderValues)=>{
        return this._prepare().get(placeholderValues);
    };
    values = (placeholderValues)=>{
        return this._prepare().values(placeholderValues);
    };
    async execute() {
        return this.config.returning ? this.all() : this.run();
    }
    $dynamic() {
        return this;
    }
}
;
 //# sourceMappingURL=insert.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/update.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SQLiteUpdateBase",
    ()=>SQLiteUpdateBase,
    "SQLiteUpdateBuilder",
    ()=>SQLiteUpdateBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/query-promise.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/selection-proxy.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/subquery.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/table.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/view-common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$view$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/view-base.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
class SQLiteUpdateBuilder {
    constructor(table, session, dialect, withList){
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.withList = withList;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteUpdateBuilder";
    set(values) {
        return new SQLiteUpdateBase(this.table, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapUpdateSet"])(this.table, values), this.session, this.dialect, this.withList);
    }
}
class SQLiteUpdateBase extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryPromise"] {
    constructor(table, set, session, dialect, withList){
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = {
            set,
            table,
            withList,
            joins: []
        };
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteUpdate";
    /** @internal */ config;
    from(source) {
        this.config.from = source;
        return this;
    }
    createJoin(joinType) {
        return (table, on)=>{
            const tableName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTableLikeName"])(table);
            if (typeof tableName === "string" && this.config.joins.some((join)=>join.alias === tableName)) {
                throw new Error(`Alias "${tableName}" is already used in this query`);
            }
            if (typeof on === "function") {
                const from = this.config.from ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteTable"]) ? table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Subquery"]) ? table._.selectedFields : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(table, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$view$2d$base$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteViewBase"]) ? table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$view$2d$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ViewBaseConfig"]].selectedFields : void 0 : void 0;
                on = on(new Proxy(this.config.table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns], new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                    sqlAliasedBehavior: "sql",
                    sqlBehavior: "sql"
                })), from && new Proxy(from, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                    sqlAliasedBehavior: "sql",
                    sqlBehavior: "sql"
                })));
            }
            this.config.joins.push({
                on,
                table,
                joinType,
                alias: tableName
            });
            return this;
        };
    }
    leftJoin = this.createJoin("left");
    rightJoin = this.createJoin("right");
    innerJoin = this.createJoin("inner");
    fullJoin = this.createJoin("full");
    /**
   * Adds a 'where' clause to the query.
   *
   * Calling this method will update only those rows that fulfill a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/update}
   *
   * @param where the 'where' clause.
   *
   * @example
   * You can use conditional operators and `sql function` to filter the rows to be updated.
   *
   * ```ts
   * // Update all cars with green color
   * db.update(cars).set({ color: 'red' })
   *   .where(eq(cars.color, 'green'));
   * // or
   * db.update(cars).set({ color: 'red' })
   *   .where(sql`${cars.color} = 'green'`)
   * ```
   *
   * You can logically combine conditional operators with `and()` and `or()` operators:
   *
   * ```ts
   * // Update all BMW cars with a green color
   * db.update(cars).set({ color: 'red' })
   *   .where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
   *
   * // Update all cars with the green or blue color
   * db.update(cars).set({ color: 'red' })
   *   .where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
   * ```
   */ where(where) {
        this.config.where = where;
        return this;
    }
    orderBy(...columns) {
        if (typeof columns[0] === "function") {
            const orderBy = columns[0](new Proxy(this.config.table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Table"].Symbol.Columns], new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                sqlAliasedBehavior: "alias",
                sqlBehavior: "sql"
            })));
            const orderByArray = Array.isArray(orderBy) ? orderBy : [
                orderBy
            ];
            this.config.orderBy = orderByArray;
        } else {
            const orderByArray = columns;
            this.config.orderBy = orderByArray;
        }
        return this;
    }
    limit(limit) {
        this.config.limit = limit;
        return this;
    }
    returning(fields = this.config.table[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$table$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteTable"].Symbol.Columns]) {
        this.config.returning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["orderSelectedFields"])(fields);
        return this;
    }
    /** @internal */ getSQL() {
        return this.dialect.buildUpdateQuery(this.config);
    }
    toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
    }
    /** @internal */ _prepare(isOneTimeQuery = true) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true, void 0, {
            type: "insert",
            tables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["extractUsedTable"])(this.config.table)
        });
    }
    prepare() {
        return this._prepare(false);
    }
    run = (placeholderValues)=>{
        return this._prepare().run(placeholderValues);
    };
    all = (placeholderValues)=>{
        return this._prepare().all(placeholderValues);
    };
    get = (placeholderValues)=>{
        return this._prepare().get(placeholderValues);
    };
    values = (placeholderValues)=>{
        return this._prepare().values(placeholderValues);
    };
    async execute() {
        return this.config.returning ? this.all() : this.run();
    }
    $dynamic() {
        return this;
    }
}
;
 //# sourceMappingURL=update.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/count.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SQLiteCountBuilder",
    ()=>SQLiteCountBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
;
;
class SQLiteCountBuilder extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQL"] {
    constructor(params){
        super(SQLiteCountBuilder.buildEmbeddedCount(params.source, params.filters).queryChunks);
        this.params = params;
        this.session = params.session;
        this.sql = SQLiteCountBuilder.buildCount(params.source, params.filters);
    }
    sql;
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteCountBuilderAsync";
    [Symbol.toStringTag] = "SQLiteCountBuilderAsync";
    session;
    static buildEmbeddedCount(source, filters) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`(select count(*) from ${source}${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(" where ").if(filters)}${filters})`;
    }
    static buildCount(source, filters) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`select count(*) from ${source}${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(" where ").if(filters)}${filters}`;
    }
    then(onfulfilled, onrejected) {
        return Promise.resolve(this.session.count(this.sql)).then(onfulfilled, onrejected);
    }
    catch(onRejected) {
        return this.then(void 0, onRejected);
    }
    finally(onFinally) {
        return this.then((value)=>{
            onFinally?.();
            return value;
        }, (reason)=>{
            onFinally?.();
            throw reason;
        });
    }
}
;
 //# sourceMappingURL=count.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/query.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RelationalQueryBuilder",
    ()=>RelationalQueryBuilder,
    "SQLiteRelationalQuery",
    ()=>SQLiteRelationalQuery,
    "SQLiteSyncRelationalQuery",
    ()=>SQLiteSyncRelationalQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/query-promise.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/relations.js [app-rsc] (ecmascript)");
;
;
;
class RelationalQueryBuilder {
    constructor(mode, fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session){
        this.mode = mode;
        this.fullSchema = fullSchema;
        this.schema = schema;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteAsyncRelationalQueryBuilder";
    findMany(config) {
        return this.mode === "sync" ? new SQLiteSyncRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? config : {}, "many") : new SQLiteRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? config : {}, "many");
    }
    findFirst(config) {
        return this.mode === "sync" ? new SQLiteSyncRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? {
            ...config,
            limit: 1
        } : {
            limit: 1
        }, "first") : new SQLiteRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? {
            ...config,
            limit: 1
        } : {
            limit: 1
        }, "first");
    }
}
class SQLiteRelationalQuery extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryPromise"] {
    constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session, config, mode){
        super();
        this.fullSchema = fullSchema;
        this.schema = schema;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
        this.config = config;
        this.mode = mode;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteAsyncRelationalQuery";
    /** @internal */ mode;
    /** @internal */ getSQL() {
        return this.dialect.buildRelationalQuery({
            fullSchema: this.fullSchema,
            schema: this.schema,
            tableNamesMap: this.tableNamesMap,
            table: this.table,
            tableConfig: this.tableConfig,
            queryConfig: this.config,
            tableAlias: this.tableConfig.tsName
        }).sql;
    }
    /** @internal */ _prepare(isOneTimeQuery = false) {
        const { query, builtQuery } = this._toSQL();
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](builtQuery, void 0, this.mode === "first" ? "get" : "all", true, (rawRows, mapColumnValue)=>{
            const rows = rawRows.map((row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapRelationalRow"])(this.schema, this.tableConfig, row, query.selection, mapColumnValue));
            if (this.mode === "first") {
                return rows[0];
            }
            return rows;
        });
    }
    prepare() {
        return this._prepare(false);
    }
    _toSQL() {
        const query = this.dialect.buildRelationalQuery({
            fullSchema: this.fullSchema,
            schema: this.schema,
            tableNamesMap: this.tableNamesMap,
            table: this.table,
            tableConfig: this.tableConfig,
            queryConfig: this.config,
            tableAlias: this.tableConfig.tsName
        });
        const builtQuery = this.dialect.sqlToQuery(query.sql);
        return {
            query,
            builtQuery
        };
    }
    toSQL() {
        return this._toSQL().builtQuery;
    }
    /** @internal */ executeRaw() {
        if (this.mode === "first") {
            return this._prepare(false).get();
        }
        return this._prepare(false).all();
    }
    async execute() {
        return this.executeRaw();
    }
}
class SQLiteSyncRelationalQuery extends SQLiteRelationalQuery {
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteSyncRelationalQuery";
    sync() {
        return this.executeRaw();
    }
}
;
 //# sourceMappingURL=query.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/raw.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SQLiteRaw",
    ()=>SQLiteRaw
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/query-promise.js [app-rsc] (ecmascript)");
;
;
class SQLiteRaw extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryPromise"] {
    constructor(execute, getSQL, action, dialect, mapBatchResult){
        super();
        this.execute = execute;
        this.getSQL = getSQL;
        this.dialect = dialect;
        this.mapBatchResult = mapBatchResult;
        this.config = {
            action
        };
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteRaw";
    /** @internal */ config;
    getQuery() {
        return {
            ...this.dialect.sqlToQuery(this.getSQL()),
            method: this.config.action
        };
    }
    mapResult(result, isFromBatch) {
        return isFromBatch ? this.mapBatchResult(result) : result;
    }
    _prepare() {
        return this;
    }
    /** @internal */ isResponseInArrayMode() {
        return false;
    }
}
;
 //# sourceMappingURL=raw.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/db.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseSQLiteDatabase",
    ()=>BaseSQLiteDatabase,
    "withReplicas",
    ()=>withReplicas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/selection-proxy.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sql/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$query$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/query-builder.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$delete$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/delete.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$insert$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/insert.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/select.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$update$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/update.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/subquery.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$count$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/count.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$query$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/query.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$raw$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/query-builders/raw.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
class BaseSQLiteDatabase {
    constructor(resultKind, dialect, session, schema){
        this.resultKind = resultKind;
        this.dialect = dialect;
        this.session = session;
        this._ = schema ? {
            schema: schema.schema,
            fullSchema: schema.fullSchema,
            tableNamesMap: schema.tableNamesMap
        } : {
            schema: void 0,
            fullSchema: {},
            tableNamesMap: {}
        };
        this.query = {};
        const query = this.query;
        if (this._.schema) {
            for (const [tableName, columns] of Object.entries(this._.schema)){
                query[tableName] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$query$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RelationalQueryBuilder"](resultKind, schema.fullSchema, this._.schema, this._.tableNamesMap, schema.fullSchema[tableName], columns, dialect, session);
            }
        }
        this.$cache = {
            invalidate: async (_params)=>{}
        };
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "BaseSQLiteDatabase";
    query;
    /**
   * Creates a subquery that defines a temporary named result set as a CTE.
   *
   * It is useful for breaking down complex queries into simpler parts and for reusing the result set in subsequent parts of the query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
   *
   * @param alias The alias for the subquery.
   *
   * Failure to provide an alias will result in a DrizzleTypeError, preventing the subquery from being referenced in other queries.
   *
   * @example
   *
   * ```ts
   * // Create a subquery with alias 'sq' and use it in the select query
   * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
   *
   * const result = await db.with(sq).select().from(sq);
   * ```
   *
   * To select arbitrary SQL values as fields in a CTE and reference them in other CTEs or in the main query, you need to add aliases to them:
   *
   * ```ts
   * // Select an arbitrary SQL value as a field in a CTE and reference it in the main query
   * const sq = db.$with('sq').as(db.select({
   *   name: sql<string>`upper(${users.name})`.as('name'),
   * })
   * .from(users));
   *
   * const result = await db.with(sq).select({ name: sq.name }).from(sq);
   * ```
   */ $with = (alias, selection)=>{
        const self = this;
        const as = (qb)=>{
            if (typeof qb === "function") {
                qb = qb(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$query$2d$builder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryBuilder"](self.dialect));
            }
            return new Proxy(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$subquery$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WithSubquery"](qb.getSQL(), selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}), alias, true), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$selection$2d$proxy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectionProxyHandler"]({
                alias,
                sqlAliasedBehavior: "alias",
                sqlBehavior: "error"
            }));
        };
        return {
            as
        };
    };
    $count(source, filters) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$count$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteCountBuilder"]({
            source,
            filters,
            session: this.session
        });
    }
    /**
   * Incorporates a previously defined CTE (using `$with`) into the main query.
   *
   * This method allows the main query to reference a temporary named result set.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
   *
   * @param queries The CTEs to incorporate into the main query.
   *
   * @example
   *
   * ```ts
   * // Define a subquery 'sq' as a CTE using $with
   * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
   *
   * // Incorporate the CTE 'sq' into the main query and select from it
   * const result = await db.with(sq).select().from(sq);
   * ```
   */ with(...queries) {
        const self = this;
        function select(fields) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteSelectBuilder"]({
                fields: fields ?? void 0,
                session: self.session,
                dialect: self.dialect,
                withList: queries
            });
        }
        function selectDistinct(fields) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteSelectBuilder"]({
                fields: fields ?? void 0,
                session: self.session,
                dialect: self.dialect,
                withList: queries,
                distinct: true
            });
        }
        function update(table) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$update$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteUpdateBuilder"](table, self.session, self.dialect, queries);
        }
        function insert(into) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$insert$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteInsertBuilder"](into, self.session, self.dialect, queries);
        }
        function delete_(from) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$delete$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteDeleteBase"](from, self.session, self.dialect, queries);
        }
        return {
            select,
            selectDistinct,
            update,
            insert,
            delete: delete_
        };
    }
    select(fields) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteSelectBuilder"]({
            fields: fields ?? void 0,
            session: this.session,
            dialect: this.dialect
        });
    }
    selectDistinct(fields) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$select$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteSelectBuilder"]({
            fields: fields ?? void 0,
            session: this.session,
            dialect: this.dialect,
            distinct: true
        });
    }
    /**
   * Creates an update query.
   *
   * Calling this method without `.where()` clause will update all rows in a table. The `.where()` clause specifies which rows should be updated.
   *
   * Use `.set()` method to specify which values to update.
   *
   * See docs: {@link https://orm.drizzle.team/docs/update}
   *
   * @param table The table to update.
   *
   * @example
   *
   * ```ts
   * // Update all rows in the 'cars' table
   * await db.update(cars).set({ color: 'red' });
   *
   * // Update rows with filters and conditions
   * await db.update(cars).set({ color: 'red' }).where(eq(cars.brand, 'BMW'));
   *
   * // Update with returning clause
   * const updatedCar: Car[] = await db.update(cars)
   *   .set({ color: 'red' })
   *   .where(eq(cars.id, 1))
   *   .returning();
   * ```
   */ update(table) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$update$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteUpdateBuilder"](table, this.session, this.dialect);
    }
    $cache;
    /**
   * Creates an insert query.
   *
   * Calling this method will create new rows in a table. Use `.values()` method to specify which values to insert.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert}
   *
   * @param table The table to insert into.
   *
   * @example
   *
   * ```ts
   * // Insert one row
   * await db.insert(cars).values({ brand: 'BMW' });
   *
   * // Insert multiple rows
   * await db.insert(cars).values([{ brand: 'BMW' }, { brand: 'Porsche' }]);
   *
   * // Insert with returning clause
   * const insertedCar: Car[] = await db.insert(cars)
   *   .values({ brand: 'BMW' })
   *   .returning();
   * ```
   */ insert(into) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$insert$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteInsertBuilder"](into, this.session, this.dialect);
    }
    /**
   * Creates a delete query.
   *
   * Calling this method without `.where()` clause will delete all rows in a table. The `.where()` clause specifies which rows should be deleted.
   *
   * See docs: {@link https://orm.drizzle.team/docs/delete}
   *
   * @param table The table to delete from.
   *
   * @example
   *
   * ```ts
   * // Delete all rows in the 'cars' table
   * await db.delete(cars);
   *
   * // Delete rows with filters and conditions
   * await db.delete(cars).where(eq(cars.color, 'green'));
   *
   * // Delete with returning clause
   * const deletedCar: Car[] = await db.delete(cars)
   *   .where(eq(cars.id, 1))
   *   .returning();
   * ```
   */ delete(from) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$delete$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteDeleteBase"](from, this.session, this.dialect);
    }
    run(query) {
        const sequel = typeof query === "string" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(query) : query.getSQL();
        if (this.resultKind === "async") {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$raw$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteRaw"](async ()=>this.session.run(sequel), ()=>sequel, "run", this.dialect, this.session.extractRawRunValueFromBatchResult.bind(this.session));
        }
        return this.session.run(sequel);
    }
    all(query) {
        const sequel = typeof query === "string" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(query) : query.getSQL();
        if (this.resultKind === "async") {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$raw$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteRaw"](async ()=>this.session.all(sequel), ()=>sequel, "all", this.dialect, this.session.extractRawAllValueFromBatchResult.bind(this.session));
        }
        return this.session.all(sequel);
    }
    get(query) {
        const sequel = typeof query === "string" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(query) : query.getSQL();
        if (this.resultKind === "async") {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$raw$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteRaw"](async ()=>this.session.get(sequel), ()=>sequel, "get", this.dialect, this.session.extractRawGetValueFromBatchResult.bind(this.session));
        }
        return this.session.get(sequel);
    }
    values(query) {
        const sequel = typeof query === "string" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].raw(query) : query.getSQL();
        if (this.resultKind === "async") {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$query$2d$builders$2f$raw$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SQLiteRaw"](async ()=>this.session.values(sequel), ()=>sequel, "values", this.dialect, this.session.extractRawValuesValueFromBatchResult.bind(this.session));
        }
        return this.session.values(sequel);
    }
    transaction(transaction, config) {
        return this.session.transaction(transaction, config);
    }
}
const withReplicas = (primary, replicas, getReplica = ()=>replicas[Math.floor(Math.random() * replicas.length)])=>{
    const select = (...args)=>getReplica(replicas).select(...args);
    const selectDistinct = (...args)=>getReplica(replicas).selectDistinct(...args);
    const $count = (...args)=>getReplica(replicas).$count(...args);
    const $with = (...args)=>getReplica(replicas).with(...args);
    const update = (...args)=>primary.update(...args);
    const insert = (...args)=>primary.insert(...args);
    const $delete = (...args)=>primary.delete(...args);
    const run = (...args)=>primary.run(...args);
    const all = (...args)=>primary.all(...args);
    const get = (...args)=>primary.get(...args);
    const values = (...args)=>primary.values(...args);
    const transaction = (...args)=>primary.transaction(...args);
    return {
        ...primary,
        update,
        insert,
        delete: $delete,
        run,
        all,
        get,
        values,
        transaction,
        $primary: primary,
        $replicas: replicas,
        select,
        selectDistinct,
        $count,
        with: $with,
        get query () {
            return getReplica(replicas).query;
        }
    };
};
;
 //# sourceMappingURL=db.js.map
}),
"[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/session.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExecuteResultSync",
    ()=>ExecuteResultSync,
    "SQLitePreparedQuery",
    ()=>SQLitePreparedQuery,
    "SQLiteSession",
    ()=>SQLiteSession,
    "SQLiteTransaction",
    ()=>SQLiteTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$cache$2f$core$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/cache/core/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/entity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/errors.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/query-promise.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/drizzle-orm@0.45.2_@prisma+client@6.19.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.8.0_prisma@6.19.2/node_modules/drizzle-orm/sqlite-core/db.js [app-rsc] (ecmascript)");
;
;
;
;
;
class ExecuteResultSync extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$query$2d$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["QueryPromise"] {
    constructor(resultCb){
        super();
        this.resultCb = resultCb;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "ExecuteResultSync";
    async execute() {
        return this.resultCb();
    }
    sync() {
        return this.resultCb();
    }
}
class SQLitePreparedQuery {
    constructor(mode, executeMethod, query, cache, queryMetadata, cacheConfig){
        this.mode = mode;
        this.executeMethod = executeMethod;
        this.query = query;
        this.cache = cache;
        this.queryMetadata = queryMetadata;
        this.cacheConfig = cacheConfig;
        if (cache && cache.strategy() === "all" && cacheConfig === void 0) {
            this.cacheConfig = {
                enable: true,
                autoInvalidate: true
            };
        }
        if (!this.cacheConfig?.enable) {
            this.cacheConfig = void 0;
        }
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "PreparedQuery";
    /** @internal */ joinsNotNullableMap;
    /** @internal */ async queryWithCache(queryString, params, query) {
        if (this.cache === void 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["is"])(this.cache, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$cache$2f$core$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NoopCache"]) || this.queryMetadata === void 0) {
            try {
                return await query();
            } catch (e) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DrizzleQueryError"](queryString, params, e);
            }
        }
        if (this.cacheConfig && !this.cacheConfig.enable) {
            try {
                return await query();
            } catch (e) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DrizzleQueryError"](queryString, params, e);
            }
        }
        if ((this.queryMetadata.type === "insert" || this.queryMetadata.type === "update" || this.queryMetadata.type === "delete") && this.queryMetadata.tables.length > 0) {
            try {
                const [res] = await Promise.all([
                    query(),
                    this.cache.onMutate({
                        tables: this.queryMetadata.tables
                    })
                ]);
                return res;
            } catch (e) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DrizzleQueryError"](queryString, params, e);
            }
        }
        if (!this.cacheConfig) {
            try {
                return await query();
            } catch (e) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DrizzleQueryError"](queryString, params, e);
            }
        }
        if (this.queryMetadata.type === "select") {
            const fromCache = await this.cache.get(this.cacheConfig.tag ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$cache$2f$core$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hashQuery"])(queryString, params), this.queryMetadata.tables, this.cacheConfig.tag !== void 0, this.cacheConfig.autoInvalidate);
            if (fromCache === void 0) {
                let result;
                try {
                    result = await query();
                } catch (e) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DrizzleQueryError"](queryString, params, e);
                }
                await this.cache.put(this.cacheConfig.tag ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$cache$2f$core$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hashQuery"])(queryString, params), result, // make sure we send tables that were used in a query only if user wants to invalidate it on each write
                this.cacheConfig.autoInvalidate ? this.queryMetadata.tables : [], this.cacheConfig.tag !== void 0, this.cacheConfig.config);
                return result;
            }
            return fromCache;
        }
        try {
            return await query();
        } catch (e) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DrizzleQueryError"](queryString, params, e);
        }
    }
    getQuery() {
        return this.query;
    }
    mapRunResult(result, _isFromBatch) {
        return result;
    }
    mapAllResult(_result, _isFromBatch) {
        throw new Error("Not implemented");
    }
    mapGetResult(_result, _isFromBatch) {
        throw new Error("Not implemented");
    }
    execute(placeholderValues) {
        if (this.mode === "async") {
            return this[this.executeMethod](placeholderValues);
        }
        return new ExecuteResultSync(()=>this[this.executeMethod](placeholderValues));
    }
    mapResult(response, isFromBatch) {
        switch(this.executeMethod){
            case "run":
                {
                    return this.mapRunResult(response, isFromBatch);
                }
            case "all":
                {
                    return this.mapAllResult(response, isFromBatch);
                }
            case "get":
                {
                    return this.mapGetResult(response, isFromBatch);
                }
        }
    }
}
class SQLiteSession {
    constructor(dialect){
        this.dialect = dialect;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteSession";
    prepareOneTimeQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper, queryMetadata, cacheConfig) {
        return this.prepareQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper, queryMetadata, cacheConfig);
    }
    run(query) {
        const staticQuery = this.dialect.sqlToQuery(query);
        try {
            return this.prepareOneTimeQuery(staticQuery, void 0, "run", false).run();
        } catch (err) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DrizzleError"]({
                cause: err,
                message: `Failed to run the query '${staticQuery.sql}'`
            });
        }
    }
    /** @internal */ extractRawRunValueFromBatchResult(result) {
        return result;
    }
    all(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run", false).all();
    }
    /** @internal */ extractRawAllValueFromBatchResult(_result) {
        throw new Error("Not implemented");
    }
    get(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run", false).get();
    }
    /** @internal */ extractRawGetValueFromBatchResult(_result) {
        throw new Error("Not implemented");
    }
    values(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run", false).values();
    }
    async count(sql) {
        const result = await this.values(sql);
        return result[0][0];
    }
    /** @internal */ extractRawValuesValueFromBatchResult(_result) {
        throw new Error("Not implemented");
    }
}
class SQLiteTransaction extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$sqlite$2d$core$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BaseSQLiteDatabase"] {
    constructor(resultType, dialect, session, schema, nestedIndex = 0){
        super(resultType, dialect, session, schema);
        this.schema = schema;
        this.nestedIndex = nestedIndex;
    }
    static [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$entity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["entityKind"]] = "SQLiteTransaction";
    rollback() {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$drizzle$2d$orm$40$0$2e$45$2e$2_$40$prisma$2b$client$40$6$2e$19$2e$2_$40$types$2b$better$2d$sqlite3$40$7$2e$6$2e$13_better$2d$sqlite3$40$12$2e$8$2e$0_prisma$40$6$2e$19$2e$2$2f$node_modules$2f$drizzle$2d$orm$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TransactionRollbackError"]();
    }
}
;
 //# sourceMappingURL=session.js.map
}),
];

//# sourceMappingURL=050a1_drizzle-orm_sqlite-core_dd320913._.js.map