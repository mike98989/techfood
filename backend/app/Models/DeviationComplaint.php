<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;

class DeviationComplaint extends Model
{
    use HasFactory;
    protected $guarded = [];
    

    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id','id');
    }

    public function deviation(): HasOne{
        return $this->hasOne(DeviationComplaintDeviationTypes::class, 'id','deviation_type_id');
    }

    public function section(): HasOne{
        return $this->hasOne(DeviationComplaintSections::class, 'id','section_id');
    }
    public function location(): HasOne{
        return $this->hasOne(DeviationComplaintLineTypes::class, 'id','location_id');
    }
    public function risk_category(): HasOne{
        return $this->hasOne(DeviationComplaintRiskCategories::class, 'id','risk_category_id');
    }

    public function code(): HasOne{
        return $this->hasOne(DeviationComplaintRemarkTypes::class, 'id','deviation_code_id');
    }

    public function product(): HasOne{
        return $this->hasOne(DeviationComplaintProductTypes::class, 'id','product_id');
    }
    
}
