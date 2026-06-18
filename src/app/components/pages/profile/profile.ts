import { Component } from "@angular/core";
import { LoginService } from "src/app/services/login-service";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.html',
    standalone: true,
    imports: [RouterLink],
    styleUrl: './profile.css',
})
export class Profile {

}
