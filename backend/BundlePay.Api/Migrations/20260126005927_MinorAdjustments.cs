using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BundlePay.Api.Migrations
{
    /// <inheritdoc />
    public partial class MinorAdjustments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Services");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Services",
                type: "character varying(140)",
                maxLength: 140,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Services",
                type: "numeric(12,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "ServiceStatus",
                table: "Services",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Services",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Bundles",
                type: "character varying(140)",
                maxLength: 140,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<int>(
                name: "BundleType",
                table: "Bundles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "OwnerUserId",
                table: "Bundles",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Bundles",
                type: "numeric(12,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Bundles",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "BundleItems",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "BundleItems",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_BundleItems_BundleId_ServiceId",
                table: "BundleItems",
                columns: new[] { "BundleId", "ServiceId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BundleItems_BundleId_ServiceId",
                table: "BundleItems");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "ServiceStatus",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "BundleType",
                table: "Bundles");

            migrationBuilder.DropColumn(
                name: "OwnerUserId",
                table: "Bundles");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Bundles");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Bundles");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "BundleItems");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "BundleItems");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Services",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(140)",
                oldMaxLength: 140);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Services",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Bundles",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(140)",
                oldMaxLength: 140);
        }
    }
}
