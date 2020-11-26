import { Field, ObjectType } from "@nestjs/graphql";
import { MyBaseEntity } from "src/base/base.entity";
import { Entity, PrimaryColumn } from "typeorm";

@Entity()
@ObjectType()
export class Song extends MyBaseEntity<Song> {
    @PrimaryColumn()
    @Field(_type => String)
    spotifyId: string;
}