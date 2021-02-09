/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


// Snapshot as of Tue Feb  9 15:12:54 2021


const PREC = {
};

module.exports = grammar({
  name: 'cql',
  extras: $ => [
     /\s|\\\r?\n/,
     $.comment
  ],
  conflicts: $ => [
     [$.fk_options],
  ],
  word: $ => $.ID,
  rules: {
    program: $ => optional($.opt_stmt_list),
    opt_stmt_list: $ => $.stmt_list,
    stmt_list: $ => repeat1(choice(seq($.stmt, ';'), $.comment, $.line_directive, $.macro)),
    stmt: $ => seq(optional($.misc_attrs), $.any_stmt),
    any_stmt: $ => choice($.select_stmt, $.explain_stmt, $.create_trigger_stmt, $.create_table_stmt, $.create_virtual_table_stmt, $.create_index_stmt, $.create_view_stmt, $.alter_table_add_column_stmt, $.drop_table_stmt, $.drop_view_stmt, $.drop_index_stmt, $.drop_trigger_stmt, $.with_delete_stmt, $.delete_stmt, $.call_stmt, $.with_insert_stmt, $.insert_stmt, $.with_update_stmt, $.update_stmt, $.update_cursor_stmt, $.upsert_stmt, $.with_upsert_stmt, $.set_stmt, $.create_proc_stmt, $.declare_proc_stmt, $.declare_func_stmt, $.declare_stmt, $.declare_enum_stmt, $.fetch_stmt, $.fetch_values_stmt, $.fetch_call_stmt, $.while_stmt, $.loop_stmt, $.leave_stmt, $.return_stmt, $.rollback_return_stmt, $.commit_return_stmt, $.continue_stmt, $.if_stmt, $.open_stmt, $.close_stmt, $.out_stmt, $.out_union_stmt, $.throw_stmt, $.trycatch_stmt, $.begin_trans_stmt, $.rollback_trans_stmt, $.commit_trans_stmt, $.proc_savepoint_stmt, $.savepoint_stmt, $.release_savepoint_stmt, $.echo_stmt, $.schema_upgrade_version_stmt, $.schema_upgrade_script_stmt, $.previous_schema_stmt, $.enforce_strict_stmt, $.enforce_normal_stmt, $.declare_schema_region_stmt, $.declare_deployable_region_stmt, $.begin_schema_region_stmt, $.end_schema_region_stmt, $.schema_ad_hoc_migration_stmt, $.emit_enums_stmt),
    explain_stmt: $ => seq($.EXPLAIN, optional($.opt_query_plan), $.explain_target),
    QUERY_PLAN: $ => prec.left(1, seq(CI('query'), CI('plan'))),
    opt_query_plan: $ => $.QUERY_PLAN,
    explain_target: $ => choice($.select_stmt, $.update_stmt, $.delete_stmt, $.with_delete_stmt, $.with_insert_stmt, $.insert_stmt, $.upsert_stmt, $.drop_table_stmt, $.drop_view_stmt, $.drop_index_stmt, $.drop_trigger_stmt, $.begin_trans_stmt, $.commit_trans_stmt),
    previous_schema_stmt: $ => $.AT_PREVIOUS_SCHEMA,
    schema_upgrade_script_stmt: $ => $.AT_SCHEMA_UPGRADE_SCRIPT,
    schema_upgrade_version_stmt: $ => seq($.AT_SCHEMA_UPGRADE_VERSION, '(', $.INT_LIT, ')'),
    set_stmt: $ => choice(seq($.SET, $.name, ":=", $.expr), seq($.SET, $.name, $.FROM, $.CURSOR, $.name)),
    version_attrs_opt_recreate: $ => choice($.AT_RECREATE, seq($.AT_RECREATE, '(', $.name, ')'), $.version_attrs),
    opt_version_attrs: $ => $.version_attrs,
    version_attrs: $ => choice(seq($.AT_CREATE, $.version_annotation, optional($.opt_version_attrs)), seq($.AT_DELETE, $.version_annotation, optional($.opt_version_attrs))),
    opt_delete_version_attr: $ => seq($.AT_DELETE, $.version_annotation),
    drop_table_stmt: $ => choice(seq($.DROP, $.TABLE, $.IF, $.EXISTS, $.name), seq($.DROP, $.TABLE, $.name)),
    drop_view_stmt: $ => choice(seq($.DROP, $.VIEW, $.IF, $.EXISTS, $.name), seq($.DROP, $.VIEW, $.name)),
    drop_index_stmt: $ => choice(seq($.DROP, $.INDEX, $.IF, $.EXISTS, $.name), seq($.DROP, $.INDEX, $.name)),
    drop_trigger_stmt: $ => choice(seq($.DROP, $.TRIGGER, $.IF, $.EXISTS, $.name), seq($.DROP, $.TRIGGER, $.name)),
    create_virtual_table_stmt: $ => seq($.CREATE, $.VIRTUAL, $.TABLE, optional($.opt_if_not_exists), $.name, $.USING, $.name, optional($.opt_module_args), $.AS, '(', $.col_key_list, ')', optional($.opt_delete_version_attr)),
    opt_module_args: $ => choice(seq('(', $.misc_attr_value_list, ')'), seq('(', $.ARGUMENTS, $.FOLLOWING, ')')),
    create_table_stmt: $ => seq($.CREATE, optional($.opt_temp), $.TABLE, optional($.opt_if_not_exists), $.name, '(', $.col_key_list, ')', optional($.opt_no_rowid), optional($.version_attrs_opt_recreate)),
    opt_temp: $ => $.TEMP,
    opt_if_not_exists: $ => seq($.IF, $.NOT, $.EXISTS),
    opt_no_rowid: $ => seq($.WITHOUT, $.ROWID),
    col_key_list: $ => choice($.col_key_def, seq($.col_key_def, ',', $.col_key_list)),
    col_key_def: $ => choice($.col_def, $.pk_def, $.fk_def, $.unq_def, $.check_def, $.shape_def),
    check_def: $ => choice(seq($.CONSTRAINT, $.name, $.CHECK, '(', $.expr, ')'), seq($.CHECK, '(', $.expr, ')')),
    shape_def: $ => choice(seq($.LIKE, $.name), seq($.LIKE, $.name, $.ARGUMENTS)),
    col_name: $ => $.name,
    misc_attr_key: $ => choice($.name, seq($.name, ':', $.name)),
    misc_attr_value_list: $ => choice($.misc_attr_value, seq($.misc_attr_value, ',', $.misc_attr_value_list)),
    misc_attr_value: $ => choice($.name, $.any_literal, $.const_expr, seq('(', $.misc_attr_value_list, ')'), seq('-', $.num_literal)),
    misc_attr: $ => choice(seq($.AT_ATTRIBUTE, '(', $.misc_attr_key, ')'), seq($.AT_ATTRIBUTE, '(', $.misc_attr_key, '=', $.misc_attr_value, ')')),
    misc_attrs: $ => seq($.misc_attr, optional($.misc_attrs)),
    col_def: $ => seq(optional($.misc_attrs), $.col_name, $.data_type_no_options, optional($.col_attrs)),
    pk_def: $ => choice(seq($.CONSTRAINT, $.name, $.PRIMARY, $.KEY, '(', $.name_list, ')'), seq($.PRIMARY, $.KEY, '(', $.name_list, ')')),
    opt_fk_options: $ => $.fk_options,
    fk_options: $ => choice($.fk_on_options, $.fk_deferred_options, seq($.fk_on_options, $.fk_deferred_options)),
    fk_on_options: $ => choice(seq($.ON, $.DELETE, $.fk_action), seq($.ON, $.UPDATE, $.fk_action), seq($.ON, $.UPDATE, $.fk_action, $.ON, $.DELETE, $.fk_action), seq($.ON, $.DELETE, $.fk_action, $.ON, $.UPDATE, $.fk_action)),
    fk_action: $ => choice(seq($.SET, $.NULL), seq($.SET, $.DEFAULT), $.CASCADE, $.RESTRICT, seq($.NO, $.ACTION)),
    NOT_DEFERRABLE: $ => prec.left(1, seq(CI('not'), CI('deferrable'))),
    fk_deferred_options: $ => choice(seq($.DEFERRABLE, optional($.fk_initial_state)), seq($.NOT_DEFERRABLE, optional($.fk_initial_state))),
    fk_initial_state: $ => choice(seq($.INITIALLY, $.DEFERRED), seq($.INITIALLY, $.IMMEDIATE)),
    fk_def: $ => choice(seq($.CONSTRAINT, $.name, $.FOREIGN, $.KEY, '(', $.name_list, ')', $.fk_target_options), seq($.FOREIGN, $.KEY, '(', $.name_list, ')', $.fk_target_options)),
    fk_target_options: $ => prec.left(seq($.REFERENCES, $.name, '(', $.name_list, ')', optional($.opt_fk_options))),
    unq_def: $ => choice(seq($.CONSTRAINT, $.name, $.UNIQUE, '(', $.name_list, ')'), seq($.UNIQUE, '(', $.name_list, ')')),
    opt_unique: $ => $.UNIQUE,
    indexed_column: $ => seq($.name, optional($.opt_asc_desc)),
    indexed_columns: $ => choice($.indexed_column, seq($.indexed_column, ',', $.indexed_columns)),
    create_index_stmt: $ => seq($.CREATE, optional($.opt_unique), $.INDEX, optional($.opt_if_not_exists), $.name, $.ON, $.name, '(', $.indexed_columns, ')', optional($.opt_delete_version_attr)),
    name: $ => choice($.ID, $.TEXT, $.TRIGGER, $.ROWID, $.KEY, $.VIRTUAL, $.TYPE, $.HIDDEN),
    opt_name: $ => $.name,
    name_list: $ => choice($.name, seq($.name, ',', $.name_list)),
    opt_name_list: $ => $.name_list,
    col_attrs: $ => choice(seq($.NOT, $.NULL, optional($.col_attrs)), seq($.PRIMARY, $.KEY, optional($.col_attrs)), seq($.PRIMARY, $.KEY, $.AUTOINCREMENT, optional($.col_attrs)), seq($.DEFAULT, '-', $.num_literal, optional($.col_attrs)), seq($.DEFAULT, $.num_literal, optional($.col_attrs)), seq($.DEFAULT, $.const_expr, optional($.col_attrs)), seq($.DEFAULT, $.str_literal, optional($.col_attrs)), seq($.COLLATE, $.name, optional($.col_attrs)), seq($.CHECK, '(', $.expr, ')', optional($.col_attrs)), seq($.UNIQUE, optional($.col_attrs)), seq($.HIDDEN, optional($.col_attrs)), seq($.AT_SENSITIVE, optional($.col_attrs)), seq($.AT_CREATE, $.version_annotation, optional($.col_attrs)), seq($.AT_DELETE, $.version_annotation, optional($.col_attrs)), seq($.fk_target_options, optional($.col_attrs))),
    version_annotation: $ => choice(seq('(', $.INT_LIT, ',', $.name, ')'), seq('(', $.INT_LIT, ')')),
    opt_kind: $ => seq('<', $.name, '>'),
    data_type_numeric: $ => choice(seq($.INT, optional($.opt_kind)), seq($.INTEGER, optional($.opt_kind)), seq($.REAL, optional($.opt_kind)), seq($.LONG, optional($.opt_kind)), seq($.BOOL, optional($.opt_kind)), seq($.LONG, $.INTEGER, optional($.opt_kind)), seq($.LONG, $.INT, optional($.opt_kind)), seq($.LONG_INT, optional($.opt_kind)), seq($.LONG_INTEGER, optional($.opt_kind))),
    data_type_any: $ => choice($.data_type_numeric, seq($.TEXT, optional($.opt_kind)), seq($.BLOB, optional($.opt_kind)), seq($.OBJECT, optional($.opt_kind)), seq($.OBJECT, '<', $.name, $.CURSOR, '>')),
    data_type_no_options: $ => choice($.data_type_any, $.ID),
    data_type_with_options: $ => choice($.data_type_any, seq($.data_type_any, $.NOT, $.NULL), seq($.data_type_any, $.AT_SENSITIVE), seq($.data_type_any, $.AT_SENSITIVE, $.NOT, $.NULL), seq($.data_type_any, $.NOT, $.NULL, $.AT_SENSITIVE), $.ID),
    str_literal: $ => choice($.STR_LIT, $.C_STR_LIT),
    num_literal: $ => choice($.INT_LIT, $.LONG_LIT, $.REAL_LIT),
    const_expr: $ => seq($.CONST, '(', $.expr, ')'),
    any_literal: $ => choice($.str_literal, $.num_literal, $.NULL, seq($.AT_FILE, '(', $.str_literal, ')'), $.AT_PROC, $.BLOB_LIT),
    raise_expr: $ => choice(seq($.RAISE, '(', $.IGNORE, ')'), seq($.RAISE, '(', $.ROLLBACK, ',', $.expr, ')'), seq($.RAISE, '(', $.ABORT, ',', $.expr, ')'), seq($.RAISE, '(', $.FAIL, ',', $.expr, ')')),
    call: $ => choice(seq($.name, '(', optional($.arg_list), ')', optional($.opt_filter_clause)), seq($.name, '(', $.DISTINCT, optional($.arg_list), ')', optional($.opt_filter_clause))),
    basic_expr: $ => choice($.name, seq($.name, '.', $.name), $.any_literal, $.const_expr, seq('(', $.expr, ')'), $.call, $.window_func_inv, $.raise_expr, seq('(', $.select_stmt, ')'), seq($.EXISTS, '(', $.select_stmt, ')')),
    math_expr: $ => prec.left(choice($.basic_expr, seq($.math_expr, '&', $.math_expr), seq($.math_expr, '|', $.math_expr), seq($.math_expr, "<<", $.math_expr), seq($.math_expr, ">>", $.math_expr), seq($.math_expr, '+', $.math_expr), seq($.math_expr, '-', $.math_expr), seq($.math_expr, '*', $.math_expr), seq($.math_expr, '/', $.math_expr), seq($.math_expr, '%', $.math_expr), seq('-', $.math_expr), seq($.math_expr, "||", $.math_expr))),
    NOT_LIKE: $ => prec.left(1, seq(CI('not'), CI('like'))),
    IS_NOT: $ => prec.left(1, seq(CI('is'), CI('not'))),
    expr: $ => prec.left(choice($.basic_expr, seq($.expr, '&', $.expr), seq($.expr, '|', $.expr), seq($.expr, "<<", $.expr), seq($.expr, ">>", $.expr), seq($.expr, '+', $.expr), seq($.expr, '-', $.expr), seq($.expr, '*', $.expr), seq($.expr, '/', $.expr), seq($.expr, '%', $.expr), seq('-', $.expr), seq($.NOT, $.expr), seq('~', $.expr), seq($.expr, $.COLLATE, $.name), seq($.expr, $.AND, $.expr), seq($.expr, $.OR, $.expr), seq($.expr, '=', $.expr), seq($.expr, "==", $.expr), seq($.expr, '<', $.expr), seq($.expr, '>', $.expr), seq($.expr, "<>", $.expr), seq($.expr, "!=", $.expr), seq($.expr, ">=", $.expr), seq($.expr, "<=", $.expr), seq($.expr, $.NOT, $.IN, '(', $.expr_list, ')'), seq($.expr, $.NOT, $.IN, '(', $.select_stmt, ')'), seq($.expr, $.IN, '(', $.expr_list, ')'), seq($.expr, $.IN, '(', $.select_stmt, ')'), seq($.expr, $.LIKE, $.expr), seq($.expr, $.NOT_LIKE, $.expr), seq($.expr, $.MATCH, $.expr), seq($.expr, $.REGEXP, $.expr), seq($.expr, $.GLOB, $.expr), seq($.expr, $.NOT, $.BETWEEN, $.math_expr, $.AND, $.math_expr), seq($.expr, $.BETWEEN, $.math_expr, $.AND, $.math_expr), seq($.expr, $.IS_NOT, $.expr), seq($.expr, $.IS, $.expr), seq($.expr, "||", $.expr), seq($.CASE, $.expr, $.case_list, $.END), seq($.CASE, $.expr, $.case_list, $.ELSE, $.expr, $.END), seq($.CASE, $.case_list, $.END), seq($.CASE, $.case_list, $.ELSE, $.expr, $.END), seq($.CAST, '(', $.expr, $.AS, $.data_type_no_options, ')'))),
    case_list: $ => choice(seq($.WHEN, $.expr, $.THEN, $.expr), seq($.WHEN, $.expr, $.THEN, $.expr, $.case_list)),
    arg_expr: $ => choice('*', $.expr, $.shape_arguments),
    arg_list: $ => choice($.arg_expr, seq($.arg_expr, ',', optional($.arg_list))),
    expr_list: $ => choice($.expr, seq($.expr, ',', $.expr_list)),
    shape_arguments: $ => choice(seq($.FROM, $.name), seq($.FROM, $.name, $.shape_def), seq($.FROM, $.ARGUMENTS), seq($.FROM, $.ARGUMENTS, $.shape_def)),
    call_expr: $ => choice($.expr, $.shape_arguments),
    call_expr_list: $ => choice($.call_expr, seq($.call_expr, ',', $.call_expr_list)),
    cte_tables: $ => choice($.cte_table, seq($.cte_table, ',', $.cte_tables)),
    cte_table: $ => choice(seq($.name, '(', $.name_list, ')', $.AS, '(', $.select_stmt_no_with, ')'), seq($.name, '(', '*', ')', $.AS, '(', $.select_stmt_no_with, ')')),
    with_prefix: $ => choice(seq($.WITH, $.cte_tables), seq($.WITH, $.RECURSIVE, $.cte_tables)),
    with_select_stmt: $ => seq($.with_prefix, $.select_stmt_no_with),
    select_stmt: $ => choice($.with_select_stmt, $.select_stmt_no_with),
    select_stmt_no_with: $ => seq($.select_core_list, optional($.opt_orderby), optional($.opt_limit), optional($.opt_offset)),
    select_core_list: $ => choice($.select_core, seq($.select_core, $.compound_operator, $.select_core_list)),
    values: $ => choice(seq('(', optional($.insert_list), ')'), seq('(', optional($.insert_list), ')', ',', $.values)),
    select_core: $ => choice(seq($.SELECT, optional($.select_opts), $.select_expr_list, optional($.opt_from_query_parts), optional($.opt_where), optional($.opt_groupby), optional($.opt_having), optional($.opt_select_window)), seq($.VALUES, $.values)),
    UNION_ALL: $ => prec.left(1, seq(CI('union'), CI('all'))),
    compound_operator: $ => choice($.UNION, $.UNION_ALL, $.INTERSECT, $.EXCEPT),
    window_func_inv: $ => seq($.name, '(', optional($.arg_list), ')', optional($.opt_filter_clause), $.OVER, $.window_name_or_defn),
    opt_filter_clause: $ => seq($.FILTER, '(', optional($.opt_where), ')'),
    window_name_or_defn: $ => choice($.window_defn, $.name),
    window_defn: $ => seq('(', optional($.opt_partition_by), optional($.opt_orderby), optional($.opt_frame_spec), ')'),
    opt_frame_spec: $ => seq($.frame_type, $.frame_boundary_opts, optional($.frame_exclude)),
    frame_type: $ => choice($.RANGE, $.ROWS, $.GROUPS),
    EXCLUDE_NO_OTHERS: $ => prec.left(1, seq(CI('exclude'), CI('no'), CI('others'))),
    EXCLUDE_CURRENT_ROW: $ => prec.left(1, seq(CI('exclude'), CI('current'), CI('row'))),
    EXCLUDE_GROUP: $ => prec.left(1, seq(CI('exclude'), CI('group'))),
    EXCLUDE_TIES: $ => prec.left(1, seq(CI('exclude'), CI('ties'))),
    frame_exclude: $ => choice($.EXCLUDE_NO_OTHERS, $.EXCLUDE_CURRENT_ROW, $.EXCLUDE_GROUP, $.EXCLUDE_TIES),
    frame_boundary_opts: $ => choice($.frame_boundary, seq($.BETWEEN, $.frame_boundary_start, $.AND, $.frame_boundary_end)),
    CURRENT_ROW: $ => prec.left(1, seq(CI('current'), CI('row'))),
    frame_boundary_start: $ => choice(seq($.UNBOUNDED, $.PRECEDING), seq($.expr, $.PRECEDING), $.CURRENT_ROW, seq($.expr, $.FOLLOWING)),
    frame_boundary_end: $ => choice(seq($.expr, $.PRECEDING), $.CURRENT_ROW, seq($.expr, $.FOLLOWING), seq($.UNBOUNDED, $.FOLLOWING)),
    frame_boundary: $ => choice(seq($.UNBOUNDED, $.PRECEDING), seq($.expr, $.PRECEDING), $.CURRENT_ROW),
    opt_partition_by: $ => seq($.PARTITION, $.BY, $.expr_list),
    opt_select_window: $ => $.window_clause,
    window_clause: $ => seq($.WINDOW, $.window_name_defn_list),
    window_name_defn_list: $ => choice($.window_name_defn, seq($.window_name_defn, ',', $.window_name_defn_list)),
    window_name_defn: $ => seq($.name, $.AS, $.window_defn),
    region_spec: $ => choice($.name, seq($.name, $.PRIVATE)),
    region_list: $ => choice(seq($.region_spec, ',', $.region_list), $.region_spec),
    declare_schema_region_stmt: $ => choice(seq($.AT_DECLARE_SCHEMA_REGION, $.name), seq($.AT_DECLARE_SCHEMA_REGION, $.name, $.USING, $.region_list)),
    declare_deployable_region_stmt: $ => choice(seq($.AT_DECLARE_DEPLOYABLE_REGION, $.name), seq($.AT_DECLARE_DEPLOYABLE_REGION, $.name, $.USING, $.region_list)),
    begin_schema_region_stmt: $ => seq($.AT_BEGIN_SCHEMA_REGION, $.name),
    end_schema_region_stmt: $ => $.AT_END_SCHEMA_REGION,
    schema_ad_hoc_migration_stmt: $ => seq($.AT_SCHEMA_AD_HOC_MIGRATION, $.version_annotation),
    emit_enums_stmt: $ => seq($.AT_EMIT_ENUMS, optional($.opt_name_list)),
    opt_from_query_parts: $ => seq($.FROM, $.query_parts),
    opt_where: $ => seq($.WHERE, $.expr),
    opt_groupby: $ => seq($.GROUP, $.BY, $.groupby_list),
    groupby_list: $ => choice($.groupby_item, seq($.groupby_item, ',', $.groupby_list)),
    groupby_item: $ => seq($.expr, optional($.opt_asc_desc)),
    opt_asc_desc: $ => choice($.ASC, $.DESC),
    opt_having: $ => seq($.HAVING, $.expr),
    opt_orderby: $ => seq($.ORDER, $.BY, $.groupby_list),
    opt_limit: $ => seq($.LIMIT, $.expr),
    opt_offset: $ => seq($.OFFSET, $.expr),
    select_opts: $ => choice($.ALL, $.DISTINCT, $.DISTINCTROW),
    select_expr_list: $ => choice($.select_expr, seq($.select_expr, ',', $.select_expr_list), '*'),
    select_expr: $ => choice(seq($.expr, optional($.opt_as_alias)), seq($.name, '.', '*')),
    opt_as_alias: $ => $.as_alias,
    as_alias: $ => choice(seq($.AS, $.name), $.name),
    query_parts: $ => choice($.table_or_subquery_list, $.join_clause),
    table_or_subquery_list: $ => choice($.table_or_subquery, seq($.table_or_subquery, ',', $.table_or_subquery_list)),
    join_clause: $ => seq($.table_or_subquery, $.join_target_list),
    join_target_list: $ => choice($.join_target, seq($.join_target, $.join_target_list)),
    table_or_subquery: $ => choice(seq($.name, optional($.opt_as_alias)), seq('(', $.select_stmt, ')', optional($.opt_as_alias)), seq($.table_function, optional($.opt_as_alias)), seq('(', $.query_parts, ')')),
    join_type: $ => choice($.LEFT, $.RIGHT, seq($.LEFT, $.OUTER), seq($.RIGHT, $.OUTER), $.INNER, $.CROSS),
    join_target: $ => prec.left(seq(optional($.join_type), $.JOIN, $.table_or_subquery, optional($.opt_join_cond))),
    opt_join_cond: $ => $.join_cond,
    join_cond: $ => choice(seq($.ON, $.expr), seq($.USING, '(', $.name_list, ')')),
    table_function: $ => seq($.name, '(', optional($.arg_list), ')'),
    create_view_stmt: $ => seq($.CREATE, optional($.opt_temp), $.VIEW, optional($.opt_if_not_exists), $.name, $.AS, $.select_stmt, optional($.opt_delete_version_attr)),
    with_delete_stmt: $ => seq($.with_prefix, $.delete_stmt),
    delete_stmt: $ => seq($.DELETE, $.FROM, $.name, optional($.opt_where)),
    opt_insert_dummy_spec: $ => seq($.AT_DUMMY_SEED, '(', $.expr, ')', optional($.dummy_modifier)),
    dummy_modifier: $ => choice($.AT_DUMMY_NULLABLES, $.AT_DUMMY_DEFAULTS, seq($.AT_DUMMY_NULLABLES, $.AT_DUMMY_DEFAULTS), seq($.AT_DUMMY_DEFAULTS, $.AT_DUMMY_NULLABLES)),
    insert_stmt_type: $ => choice(seq($.INSERT, $.INTO), seq($.INSERT, $.OR, $.REPLACE, $.INTO), seq($.INSERT, $.OR, $.IGNORE, $.INTO), seq($.INSERT, $.OR, $.ROLLBACK, $.INTO), seq($.INSERT, $.OR, $.ABORT, $.INTO), seq($.INSERT, $.OR, $.FAIL, $.INTO), seq($.REPLACE, $.INTO)),
    with_insert_stmt: $ => seq($.with_prefix, $.insert_stmt),
    opt_column_spec: $ => choice(seq('(', optional($.opt_name_list), ')'), seq('(', $.shape_def, ')')),
    from_shape: $ => choice(seq($.FROM, $.CURSOR, $.name, optional($.opt_column_spec)), seq($.FROM, $.name, optional($.opt_column_spec)), seq($.FROM, $.ARGUMENTS, optional($.opt_column_spec))),
    insert_stmt: $ => choice(seq($.insert_stmt_type, $.name, optional($.opt_column_spec), $.select_stmt, optional($.opt_insert_dummy_spec)), seq($.insert_stmt_type, $.name, optional($.opt_column_spec), $.from_shape, optional($.opt_insert_dummy_spec)), seq($.insert_stmt_type, $.name, $.DEFAULT, $.VALUES), seq($.insert_stmt_type, $.name, $.USING, $.expr_names, optional($.opt_insert_dummy_spec))),
    insert_list: $ => choice($.expr, seq($.expr, ',', optional($.insert_list))),
    basic_update_stmt: $ => seq($.UPDATE, optional($.opt_name), $.SET, $.update_list, optional($.opt_where)),
    with_update_stmt: $ => seq($.with_prefix, $.update_stmt),
    update_stmt: $ => seq($.UPDATE, $.name, $.SET, $.update_list, optional($.opt_where), optional($.opt_orderby), optional($.opt_limit)),
    update_entry: $ => seq($.name, '=', $.expr),
    update_list: $ => choice($.update_entry, seq($.update_entry, ',', $.update_list)),
    with_upsert_stmt: $ => seq($.with_prefix, $.upsert_stmt),
    ON_CONFLICT: $ => prec.left(1, seq(CI('on'), CI('conflict'))),
    upsert_stmt: $ => choice(seq($.insert_stmt, $.ON_CONFLICT, optional($.conflict_target), $.DO, $.NOTHING), seq($.insert_stmt, $.ON_CONFLICT, optional($.conflict_target), $.DO, $.basic_update_stmt)),
    update_cursor_stmt: $ => choice(seq($.UPDATE, $.CURSOR, $.name, optional($.opt_column_spec), $.FROM, $.VALUES, '(', optional($.insert_list), ')'), seq($.UPDATE, $.CURSOR, $.name, optional($.opt_column_spec), $.from_shape), seq($.UPDATE, $.CURSOR, $.name, $.USING, $.expr_names)),
    conflict_target: $ => seq('(', $.indexed_columns, ')', optional($.opt_where)),
    function: $ => choice($.FUNC, $.FUNCTION),
    declare_enum_stmt: $ => seq($.DECLARE, $.ENUM, $.name, $.data_type_numeric, '(', $.enum_values, ')'),
    enum_values: $ => choice($.enum_value, seq($.enum_value, ',', $.enum_values)),
    enum_value: $ => choice($.name, seq($.name, '=', $.expr)),
    declare_func_stmt: $ => choice(seq($.DECLARE, $.function, $.name, '(', optional($.params), ')', $.data_type_with_options), seq($.DECLARE, $.SELECT, $.function, $.name, '(', optional($.params), ')', $.data_type_with_options), seq($.DECLARE, $.function, $.name, '(', optional($.params), ')', $.CREATE, $.data_type_with_options), seq($.DECLARE, $.SELECT, $.function, $.name, '(', optional($.params), ')', '(', $.typed_names, ')')),
    procedure: $ => choice($.PROC, $.PROCEDURE),
    declare_proc_stmt: $ => choice(seq($.DECLARE, $.procedure, $.name, '(', optional($.params), ')'), seq($.DECLARE, $.procedure, $.name, '(', optional($.params), ')', '(', $.typed_names, ')'), seq($.DECLARE, $.procedure, $.name, '(', optional($.params), ')', $.USING, $.TRANSACTION), seq($.DECLARE, $.procedure, $.name, '(', optional($.params), ')', $.OUT, '(', $.typed_names, ')'), seq($.DECLARE, $.procedure, $.name, '(', optional($.params), ')', $.OUT, '(', $.typed_names, ')', $.USING, $.TRANSACTION), seq($.DECLARE, $.procedure, $.name, '(', optional($.params), ')', $.OUT, $.UNION, '(', $.typed_names, ')'), seq($.DECLARE, $.procedure, $.name, '(', optional($.params), ')', $.OUT, $.UNION, '(', $.typed_names, ')', $.USING, $.TRANSACTION)),
    create_proc_stmt: $ => seq($.CREATE, $.procedure, $.name, '(', optional($.params), ')', $.BEGIN, optional($.opt_stmt_list), $.END),
    inout: $ => choice($.IN, $.OUT, $.INOUT),
    typed_name: $ => choice(seq($.name, $.data_type_with_options), $.shape_def, seq($.name, $.shape_def)),
    typed_names: $ => choice($.typed_name, seq($.typed_name, ',', $.typed_names)),
    param: $ => choice(seq($.name, $.data_type_with_options), seq($.inout, $.name, $.data_type_with_options), $.shape_def, seq($.name, $.shape_def)),
    params: $ => choice($.param, seq($.param, ',', optional($.params))),
    declare_stmt: $ => choice(seq($.DECLARE, $.name_list, $.data_type_with_options), seq($.DECLARE, $.name, $.CURSOR, $.FOR, $.select_stmt), seq($.DECLARE, $.name, $.CURSOR, $.FOR, $.explain_stmt), seq($.DECLARE, $.name, $.CURSOR, $.FOR, $.call_stmt), seq($.DECLARE, $.name, $.CURSOR, $.FETCH, $.FROM, $.call_stmt), seq($.DECLARE, $.name, $.CURSOR, $.shape_def), seq($.DECLARE, $.name, $.CURSOR, $.LIKE, $.select_stmt), seq($.DECLARE, $.name, $.CURSOR, $.FOR, $.name), seq($.DECLARE, $.name, $.TYPE, $.data_type_with_options)),
    call_stmt: $ => choice(seq($.CALL, $.name, '(', ')'), seq($.CALL, $.name, '(', $.call_expr_list, ')')),
    while_stmt: $ => seq($.WHILE, $.expr, $.BEGIN, optional($.opt_stmt_list), $.END),
    loop_stmt: $ => seq($.LOOP, $.fetch_stmt, $.BEGIN, optional($.opt_stmt_list), $.END),
    leave_stmt: $ => $.LEAVE,
    return_stmt: $ => $.RETURN,
    rollback_return_stmt: $ => seq($.ROLLBACK, $.RETURN),
    commit_return_stmt: $ => seq($.COMMIT, $.RETURN),
    throw_stmt: $ => $.THROW,
    trycatch_stmt: $ => seq($.BEGIN, $.TRY, optional($.opt_stmt_list), $.END, $.TRY, ';', $.BEGIN, $.CATCH, optional($.opt_stmt_list), $.END, $.CATCH),
    continue_stmt: $ => $.CONTINUE,
    fetch_stmt: $ => choice(seq($.FETCH, $.name, $.INTO, $.name_list), seq($.FETCH, $.name)),
    fetch_values_stmt: $ => choice(seq($.FETCH, $.name, optional($.opt_column_spec), $.FROM, $.VALUES, '(', optional($.insert_list), ')', optional($.opt_insert_dummy_spec)), seq($.FETCH, $.name, optional($.opt_column_spec), $.from_shape, optional($.opt_insert_dummy_spec)), seq($.FETCH, $.name, $.USING, $.expr_names, optional($.opt_insert_dummy_spec))),
    expr_names: $ => choice($.expr_name, seq($.expr_name, ',', $.expr_names)),
    expr_name: $ => seq($.expr, $.as_alias),
    fetch_call_stmt: $ => seq($.FETCH, $.name, optional($.opt_column_spec), $.FROM, $.call_stmt),
    open_stmt: $ => seq($.OPEN, $.name),
    close_stmt: $ => seq($.CLOSE, $.name),
    out_stmt: $ => seq($.OUT, $.name),
    out_union_stmt: $ => seq($.OUT, $.UNION, $.name),
    if_stmt: $ => seq($.IF, $.expr, $.THEN, optional($.opt_stmt_list), optional(repeat1($.elseif_item)), optional($.opt_else), $.END, $.IF),
    opt_else: $ => seq($.ELSE, optional($.opt_stmt_list)),
    ELSE_IF: $ => prec.left(1, seq(CI('else'), CI('if'))),
    elseif_item: $ => seq($.ELSE_IF, $.expr, $.THEN, optional($.opt_stmt_list)),
    elseif_list: $ => prec.left(choice($.elseif_item, seq($.elseif_item, $.elseif_list))),
    opt_elseif_list: $ => $.elseif_list,
    transaction_mode: $ => choice($.DEFERRED, $.IMMEDIATE, $.EXCLUSIVE),
    begin_trans_stmt: $ => choice(seq($.BEGIN, optional($.transaction_mode), $.TRANSACTION), seq($.BEGIN, optional($.transaction_mode))),
    rollback_trans_stmt: $ => choice($.ROLLBACK, seq($.ROLLBACK, $.TRANSACTION), seq($.ROLLBACK, $.TO, $.savepoint_name), seq($.ROLLBACK, $.TRANSACTION, $.TO, $.savepoint_name), seq($.ROLLBACK, $.TO, $.SAVEPOINT, $.savepoint_name), seq($.ROLLBACK, $.TRANSACTION, $.TO, $.SAVEPOINT, $.savepoint_name)),
    commit_trans_stmt: $ => choice(seq($.COMMIT, $.TRANSACTION), $.COMMIT),
    proc_savepoint_stmt: $ => seq($.procedure, $.SAVEPOINT, $.BEGIN, optional($.opt_stmt_list), $.END),
    savepoint_name: $ => choice($.AT_PROC, $.name),
    savepoint_stmt: $ => seq($.SAVEPOINT, $.savepoint_name),
    release_savepoint_stmt: $ => choice(seq($.RELEASE, $.savepoint_name), seq($.RELEASE, $.SAVEPOINT, $.savepoint_name)),
    echo_stmt: $ => seq($.AT_ECHO, $.name, ',', $.str_literal),
    alter_table_add_column_stmt: $ => seq($.ALTER, $.TABLE, $.name, $.ADD, $.COLUMN, $.col_def),
    create_trigger_stmt: $ => seq($.CREATE, optional($.opt_temp), $.TRIGGER, optional($.opt_if_not_exists), $.trigger_def, optional($.opt_delete_version_attr)),
    trigger_def: $ => seq($.name, optional($.trigger_condition), $.trigger_operation, $.ON, $.name, $.trigger_action),
    trigger_condition: $ => choice($.BEFORE, $.AFTER, seq($.INSTEAD, $.OF)),
    trigger_operation: $ => choice($.DELETE, $.INSERT, seq($.UPDATE, optional($.opt_of))),
    opt_of: $ => seq($.OF, $.name_list),
    trigger_action: $ => seq(optional($.opt_foreachrow), optional($.opt_when_expr), $.BEGIN, $.trigger_stmts, $.END),
    opt_foreachrow: $ => seq($.FOR, $.EACH, $.ROW),
    opt_when_expr: $ => seq($.WHEN, $.expr),
    trigger_stmts: $ => choice($.trigger_stmt, seq($.trigger_stmt, $.trigger_stmts)),
    trigger_stmt: $ => choice(seq($.trigger_update_stmt, ';'), seq($.trigger_insert_stmt, ';'), seq($.trigger_delete_stmt, ';'), seq($.trigger_select_stmt, ';')),
    trigger_select_stmt: $ => $.select_stmt_no_with,
    trigger_insert_stmt: $ => $.insert_stmt,
    trigger_delete_stmt: $ => $.delete_stmt,
    trigger_update_stmt: $ => $.basic_update_stmt,
    enforcement_options: $ => choice(seq($.FOREIGN, $.KEY, $.ON, $.UPDATE), seq($.FOREIGN, $.KEY, $.ON, $.DELETE), $.JOIN, seq($.UPSERT, $.STATEMENT), seq($.WINDOW, $.function), $.procedure, seq($.WITHOUT, $.ROWID)),
    enforce_strict_stmt: $ => seq($.AT_ENFORCE_STRICT, $.enforcement_options),
    enforce_normal_stmt: $ => seq($.AT_ENFORCE_NORMAL, $.enforcement_options),
    comment: $ => token(choice(seq('--', /(\\(.|\r?\n)|[^\\\n])*/), seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/'))),
    line_directive: $ => seq(/#[ \t]*/, $.INT_LIT, $.C_STR_LIT, /[^\n]*/, /\n/),
    macro: $ => choice($.preproc_include, $.preproc_def, $.preproc_function_def, $.preproc_call),
    preproc_def: $ => seq(preprocessor('define'),field('name', $.ID),field('value', optional($.preproc_arg)),'\n'),
    preproc_call: $ => seq(field('directive', $.preproc_directive),field('argument', optional($.preproc_arg)),'\n'),
    ...preprocIf('', $ => $.stmt),
    ...preprocIf('_in_field_declaration_list', $ => $.field_declaration_list_item),
    field_declaration_list_item: $ => choice($.declare_stmt,$.preproc_def,$.preproc_function_def,$.preproc_call,alias($.preproc_if_in_field_declaration_list, $.preproc_if),alias($.preproc_ifdef_in_field_declaration_list, $.preproc_ifdef),),
    preproc_include: $ => seq(preprocessor('include'),field('path', choice($.string_literal,$.system_lib_string,$.ID,alias($.preproc_call_expression, $.call_expression),)),'\n'),
    preproc_function_def: $ => seq(preprocessor('define'),field('name', $.ID),field('parameters', $.preproc_params),field('value', optional($.preproc_arg)),'\n'),
    preproc_directive: $ => /#[ \t]*[a-zA-Z]\w*/, preproc_arg: $ => token(prec(-1, repeat1(/.|\\\r?\n/))),
    preproc_expression: $ => choice($.ID,$.expr),
    call_expression: $ => prec(1, seq(field('function', $.expression),field('arguments', $.argument_list))),
    preproc_call_expression: $ => prec(1, seq(field('function', $.ID),field('arguments', alias($.preproc_argument_list, $.argument_list)))),
    preproc_argument_list: $ => seq('(',commaSep($.preproc_expression),')'),
    argument_list: $ => seq('(', commaSep($.expression), ')'),
    preproc_expression: $ => $.expression,
    expression: $ => $.expr,
    string_literal: $ => seq(choice('L"', 'u"', 'U"', 'u8"', '"'),repeat(choice(token.immediate(prec(1, /[^\\"\n]+/)),$.escape_sequence)),'"',),
    escape_sequence: $ => token(prec(1, seq('\\',choice(/[^xuU]/,/\d{2,3}/,/x[0-9a-fA-F]{2,}/,/u[0-9a-fA-F]{4}/,/U[0-9a-fA-F]{8}/)))),
    system_lib_string: $ => token(seq('<',repeat(choice(/[^>\n]/, '\\>')),'>')),
    preproc_params: $ => seq(token.immediate('('), commaSep(choice($.ID, '...')), ')'),
    EXPLAIN: $ => CI('explain'),
    AT_PREVIOUS_SCHEMA: $ => CI('@previous_schema'),
    AT_SCHEMA_UPGRADE_SCRIPT: $ => CI('@schema_upgrade_script'),
    AT_SCHEMA_UPGRADE_VERSION: $ => CI('@schema_upgrade_version'),
    SET: $ => CI('set'),
    FROM: $ => CI('from'),
    CURSOR: $ => CI('cursor'),
    AT_RECREATE: $ => CI('@recreate'),
    AT_CREATE: $ => CI('@create'),
    AT_DELETE: $ => CI('@delete'),
    DROP: $ => CI('drop'),
    TABLE: $ => CI('table'),
    IF: $ => CI('if'),
    EXISTS: $ => CI('exists'),
    VIEW: $ => CI('view'),
    INDEX: $ => CI('index'),
    TRIGGER: $ => CI('trigger'),
    CREATE: $ => CI('create'),
    VIRTUAL: $ => CI('virtual'),
    USING: $ => CI('using'),
    AS: $ => CI('as'),
    ARGUMENTS: $ => CI('arguments'),
    FOLLOWING: $ => CI('following'),
    TEMP: $ => CI('temp'),
    NOT: $ => CI('not'),
    WITHOUT: $ => CI('without'),
    ROWID: $ => CI('rowid'),
    CONSTRAINT: $ => CI('constraint'),
    CHECK: $ => CI('check'),
    LIKE: $ => CI('like'),
    AT_ATTRIBUTE: $ => CI('@attribute'),
    PRIMARY: $ => CI('primary'),
    KEY: $ => CI('key'),
    ON: $ => CI('on'),
    DELETE: $ => CI('delete'),
    UPDATE: $ => CI('update'),
    NULL: $ => CI('null'),
    DEFAULT: $ => CI('default'),
    CASCADE: $ => CI('cascade'),
    RESTRICT: $ => CI('restrict'),
    NO: $ => CI('no'),
    ACTION: $ => CI('action'),
    DEFERRABLE: $ => CI('deferrable'),
    INITIALLY: $ => CI('initially'),
    DEFERRED: $ => CI('deferred'),
    IMMEDIATE: $ => CI('immediate'),
    FOREIGN: $ => CI('foreign'),
    REFERENCES: $ => CI('references'),
    UNIQUE: $ => CI('unique'),
    TEXT: $ => CI('text'),
    TYPE: $ => CI('type'),
    HIDDEN: $ => CI('hidden'),
    AUTOINCREMENT: $ => CI('autoincrement'),
    COLLATE: $ => CI('collate'),
    AT_SENSITIVE: $ => CI('@sensitive'),
    INT: $ => CI('int'),
    INTEGER: $ => CI('integer'),
    REAL: $ => CI('real'),
    LONG: $ => CI('long'),
    BOOL: $ => CI('bool'),
    LONG_INT: $ => CI('long_int'),
    LONG_INTEGER: $ => CI('long_integer'),
    BLOB: $ => CI('blob'),
    OBJECT: $ => CI('object'),
    CONST: $ => CI('const'),
    AT_FILE: $ => CI('@file'),
    AT_PROC: $ => CI('@proc'),
    RAISE: $ => CI('raise'),
    IGNORE: $ => CI('ignore'),
    ROLLBACK: $ => CI('rollback'),
    ABORT: $ => CI('abort'),
    FAIL: $ => CI('fail'),
    DISTINCT: $ => CI('distinct'),
    AND: $ => CI('and'),
    OR: $ => CI('or'),
    IN: $ => CI('in'),
    MATCH: $ => CI('match'),
    REGEXP: $ => CI('regexp'),
    GLOB: $ => CI('glob'),
    BETWEEN: $ => CI('between'),
    IS: $ => CI('is'),
    CASE: $ => CI('case'),
    END: $ => CI('end'),
    ELSE: $ => CI('else'),
    CAST: $ => CI('cast'),
    WHEN: $ => CI('when'),
    THEN: $ => CI('then'),
    WITH: $ => CI('with'),
    RECURSIVE: $ => CI('recursive'),
    SELECT: $ => CI('select'),
    VALUES: $ => CI('values'),
    UNION: $ => CI('union'),
    INTERSECT: $ => CI('intersect'),
    EXCEPT: $ => CI('except'),
    OVER: $ => CI('over'),
    FILTER: $ => CI('filter'),
    RANGE: $ => CI('range'),
    ROWS: $ => CI('rows'),
    GROUPS: $ => CI('groups'),
    UNBOUNDED: $ => CI('unbounded'),
    PRECEDING: $ => CI('preceding'),
    PARTITION: $ => CI('partition'),
    BY: $ => CI('by'),
    WINDOW: $ => CI('window'),
    PRIVATE: $ => CI('private'),
    AT_DECLARE_SCHEMA_REGION: $ => CI('@declare_schema_region'),
    AT_DECLARE_DEPLOYABLE_REGION: $ => CI('@declare_deployable_region'),
    AT_BEGIN_SCHEMA_REGION: $ => CI('@begin_schema_region'),
    AT_END_SCHEMA_REGION: $ => CI('@end_schema_region'),
    AT_SCHEMA_AD_HOC_MIGRATION: $ => CI('@schema_ad_hoc_migration'),
    AT_EMIT_ENUMS: $ => CI('@emit_enums'),
    WHERE: $ => CI('where'),
    GROUP: $ => CI('group'),
    ASC: $ => CI('asc'),
    DESC: $ => CI('desc'),
    HAVING: $ => CI('having'),
    ORDER: $ => CI('order'),
    LIMIT: $ => CI('limit'),
    OFFSET: $ => CI('offset'),
    ALL: $ => CI('all'),
    DISTINCTROW: $ => CI('distinctrow'),
    LEFT: $ => CI('left'),
    RIGHT: $ => CI('right'),
    OUTER: $ => CI('outer'),
    INNER: $ => CI('inner'),
    CROSS: $ => CI('cross'),
    JOIN: $ => CI('join'),
    AT_DUMMY_SEED: $ => CI('@dummy_seed'),
    AT_DUMMY_NULLABLES: $ => CI('@dummy_nullables'),
    AT_DUMMY_DEFAULTS: $ => CI('@dummy_defaults'),
    INSERT: $ => CI('insert'),
    INTO: $ => CI('into'),
    REPLACE: $ => CI('replace'),
    DO: $ => CI('do'),
    NOTHING: $ => CI('nothing'),
    FUNC: $ => CI('func'),
    FUNCTION: $ => CI('function'),
    DECLARE: $ => CI('declare'),
    ENUM: $ => CI('enum'),
    PROC: $ => CI('proc'),
    PROCEDURE: $ => CI('procedure'),
    TRANSACTION: $ => CI('transaction'),
    OUT: $ => CI('out'),
    BEGIN: $ => CI('begin'),
    INOUT: $ => CI('inout'),
    FOR: $ => CI('for'),
    FETCH: $ => CI('fetch'),
    CALL: $ => CI('call'),
    WHILE: $ => CI('while'),
    LOOP: $ => CI('loop'),
    LEAVE: $ => CI('leave'),
    RETURN: $ => CI('return'),
    COMMIT: $ => CI('commit'),
    THROW: $ => CI('throw'),
    TRY: $ => CI('try'),
    CATCH: $ => CI('catch'),
    CONTINUE: $ => CI('continue'),
    OPEN: $ => CI('open'),
    CLOSE: $ => CI('close'),
    EXCLUSIVE: $ => CI('exclusive'),
    TO: $ => CI('to'),
    SAVEPOINT: $ => CI('savepoint'),
    RELEASE: $ => CI('release'),
    AT_ECHO: $ => CI('@echo'),
    ALTER: $ => CI('alter'),
    ADD: $ => CI('add'),
    COLUMN: $ => CI('column'),
    BEFORE: $ => CI('before'),
    AFTER: $ => CI('after'),
    INSTEAD: $ => CI('instead'),
    OF: $ => CI('of'),
    EACH: $ => CI('each'),
    ROW: $ => CI('row'),
    UPSERT: $ => CI('upsert'),
    STATEMENT: $ => CI('statement'),
    AT_ENFORCE_STRICT: $ => CI('@enforce_strict'),
    AT_ENFORCE_NORMAL: $ => CI('@enforce_normal'),
    INT_LIT: $ => choice(/[0-9]+/, /0x[0-9a-fA-F]+/),
    LONG_LIT: $ => choice(/[0-9]+L/, /0x[0-9a-fA-F]+L/),
    REAL_LIT: $ => /([0-9]+\.[0-9]*|\.[0-9]+)((E|e)(\+|\-)?[0-9]+)?/,
    BLOB_LIT: $ => /[xX]'([0-9a-fA-F][0-9a-fA-F])*'/,
    C_STR_LIT: $ => /\"(\\.|[^"\n])*\"/,
    STR_LIT: $ => /'(\\.|''|[^'\n])*'/,
    ID: $ => /[_A-Za-z][A-Za-z0-9_]*/
  }
});

// make string case insensitive
function CI (keyword) {
  return new RegExp(keyword
     .split('')
     .map(letter => `[${letter}${letter.toUpperCase()}]`)
     .join('')
  )
}
// generic rule for macro directives where the directive
// is going to be case insensitive.
function preprocessor (command) {
  return alias(new RegExp('#[ \t]*' + command), '#' + command)
}

// generic rule making optional commaSep1.
function commaSep (rule) {
  return optional(commaSep1(rule))
}

// generic rule for a list of ID separated by ","
function commaSep1 (rule) {
  return seq(rule, repeat(seq(',', rule)))
}

function preprocIf (suffix, content) {
  function elseBlock ($) {
    return choice(
      suffix ? alias($['preproc_else' + suffix], $.preproc_else) : $.preproc_else,
      suffix ? alias($['preproc_elif' + suffix], $.preproc_elif) : $.preproc_elif,
    );
  }
  return {
    ['preproc_if' + suffix]: $ => seq(
      preprocessor('if'),
      field('condition', $.preproc_expression),
      '\n',
      repeat(content($)),
      field('alternative', optional(elseBlock($))),
      preprocessor('endif')
    ),
    ['preproc_ifdef' + suffix]: $ => seq(
      choice(preprocessor('ifdef'), preprocessor('ifndef')),
      field('name', $.ID),
      repeat(content($)),
      field('alternative', optional(elseBlock($))),
      preprocessor('endif')
    ),
    ['preproc_else' + suffix]: $ => seq(
      preprocessor('else'),
      repeat(content($))
    ),
    ['preproc_elif' + suffix]: $ => seq(
      preprocessor('elif'),
      field('condition', $.preproc_expression),
      '\n',
      repeat(content($)),
      field('alternative', optional(elseBlock($))),
    )
  }
}

