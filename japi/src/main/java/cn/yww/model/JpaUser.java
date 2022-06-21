package cn.yww.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "jpa_user")
@Data
@EntityListeners(AuditingEntityListener.class)
public class JpaUser {
    @Id
    @GeneratedValue
    private Integer id;

    private String name;

    private String emial;

    @Column(name = "version")
    @Version
    private Long objectVersion;

    @Column(name = "create_by", updatable = false)
    @CreatedBy
    private String createdBy;

    @Column(name = "create_date", updatable = false)
    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createdDate;

    @Column(name = "updated_by")
    @LastModifiedBy
    private String updatedBy;

    @Column(name = "updated_date")
    @LastModifiedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date updatedDate;
}
