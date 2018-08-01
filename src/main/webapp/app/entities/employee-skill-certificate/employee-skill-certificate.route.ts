import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeSkillCertificate } from 'app/shared/model/employee-skill-certificate.model';
import { EmployeeSkillCertificateService } from './employee-skill-certificate.service';
import { EmployeeSkillCertificateComponent } from './employee-skill-certificate.component';
import { EmployeeSkillCertificateDetailComponent } from './employee-skill-certificate-detail.component';
import { EmployeeSkillCertificateUpdateComponent } from './employee-skill-certificate-update.component';
import { EmployeeSkillCertificateDeletePopupComponent } from './employee-skill-certificate-delete-dialog.component';
import { IEmployeeSkillCertificate } from 'app/shared/model/employee-skill-certificate.model';

@Injectable({ providedIn: 'root' })
export class EmployeeSkillCertificateResolve implements Resolve<IEmployeeSkillCertificate> {
    constructor(private service: EmployeeSkillCertificateService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const employeeSkillEmployeeId = route.params['employeeSkillEmployeeId'] ? route.params['employeeSkillEmployeeId'] : null;
        const employeeSkillName = route.params['employeeSkillName'] ? route.params['employeeSkillName'] : null;
        const certificateTypeId = route.params['certificateTypeId'] ? route.params['certificateTypeId'] : null;
        if (employeeSkillEmployeeId && employeeSkillName && certificateTypeId) {
            return this.service
                .find(employeeSkillEmployeeId, employeeSkillName, certificateTypeId)
                .pipe(map((employeeSkillCertificate: HttpResponse<EmployeeSkillCertificate>) => employeeSkillCertificate.body));
        }
        return of(new EmployeeSkillCertificate());
    }
}

export const employeeSkillCertificateRoute: Routes = [
    {
        path: 'employee-skill-certificate',
        component: EmployeeSkillCertificateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EmployeeSkillCertificates'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employee-skill-certificate/:employeeSkillEmployeeId/:employeeSkillName/:certificateTypeId/view',
        component: EmployeeSkillCertificateDetailComponent,
        resolve: {
            employeeSkillCertificate: EmployeeSkillCertificateResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EmployeeSkillCertificates'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employee-skill-certificate/new',
        component: EmployeeSkillCertificateUpdateComponent,
        resolve: {
            employeeSkillCertificate: EmployeeSkillCertificateResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EmployeeSkillCertificates'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employee-skill-certificate/:employeeSkillEmployeeId/:employeeSkillName/:certificateTypeId/edit',
        component: EmployeeSkillCertificateUpdateComponent,
        resolve: {
            employeeSkillCertificate: EmployeeSkillCertificateResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EmployeeSkillCertificates'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employeeSkillCertificatePopupRoute: Routes = [
    {
        path: 'employee-skill-certificate/:employeeSkillEmployeeId/:employeeSkillName/:certificateTypeId/delete',
        component: EmployeeSkillCertificateDeletePopupComponent,
        resolve: {
            employeeSkillCertificate: EmployeeSkillCertificateResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EmployeeSkillCertificates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
