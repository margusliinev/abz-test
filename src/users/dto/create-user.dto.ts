import { File } from 'buffer';
import { IsEmail, IsInt, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
    @Length(2, 60, { message: 'Name must be between 2 and 60 characters.' })
    @IsString({ message: 'Name must be a string.' })
    @IsNotEmpty({ message: 'Name is required.' })
    name: string;

    // IsEmail probably already covers RFC2822 standard but just in case I included the regex, could not find documentation on this.

    @IsEmail({}, { message: 'Email is not valid.' })
    @Matches(
        // eslint-disable-next-line no-control-regex
        /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
        { message: 'Email is not valid.' },
    )
    @Length(2, 100, { message: 'Email must be between 2 and 100 characters.' })
    @IsString({ message: 'Email must be a string.' })
    @IsNotEmpty({ message: 'Email is required.' })
    email: string;

    @Matches(/^(\+380|380)?[0-9]{9}$/, { message: 'Number should start with code of Ukraine +380 and be exactly 9 digits.' })
    @IsString({ message: 'Phone number must be a string.' })
    @IsNotEmpty({ message: 'Phone number is required.' })
    phone: string;

    @IsInt({ message: 'Position id must be an integer.' })
    @IsNotEmpty({ message: 'Position id is required.' })
    position_id: number;

    @IsNotEmpty({ message: 'Photo is required.' })
    photo: File;
}
