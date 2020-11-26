import { Field, ObjectType } from "@nestjs/graphql";
import { MyBaseEntity } from "src/base/base.entity";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
@ObjectType()
export class Song extends MyBaseEntity<Song> {
    @Field(_type => String)
    @PrimaryColumn()
    spotifyId: string;
}